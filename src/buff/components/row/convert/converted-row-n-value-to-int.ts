import { BadRequestException } from '@nestjs/common';

export class ConvertedRowNValueToInt {
	constructor(
		private readData: {
			title: string | number;
			index: number;
			begin: string | number;
			header: string;
			end: string | number;
			value: string;
		}[],
		private nValue: string,
		private stringNumber: number,
	) {}

	convert(): {
		title: string | number;
		index: number;
		begin: string | number;
		header: string;
		end: string | number;
		value: string | number;
	}[] {
		const foundNValue = this.readData.find((el) => el.title === this.nValue);
		if (!foundNValue) {
			return [
				...this.readData,
				{
					value: 1,
					title: 'n',
					end: null,
					begin: null,
					header: null,
					index: this.readData.length,
				},
			];
		}

		return this.readData.map((el) => {
			const isTargetNValue = el.title === this.nValue;
			const value: string | number = isTargetNValue ? Number(el.value) : el.value;

			if (isTargetNValue && isNaN(value as number)) {
				throw new BadRequestException(
					`Произошла ошибка при конвертации n, строка: ${this.stringNumber} `,
				);
			}
			return {
				...el,
				value: value,
			};
		});
	}
}
