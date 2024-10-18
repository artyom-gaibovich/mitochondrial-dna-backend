import { isMiddlewareRouteExcluded } from '@nestjs/core/middleware/utils';
import { BadRequestException } from '@nestjs/common';

export class ConvertedToIntBeginEndOptions {
	constructor(
		private readData: {
			title: string;
			index: number;
			header: string;
			begin: string;
			end: string;
		}[],
		private values: string[],
		private fillValue: '' | null,
	) {}

	convert(): {
		title: string | number;
		index: number;
		header: string;
		begin: string | number;
		end: string | number;
	}[] {
		const result = this.readData.map((el) => {
			let convertedReadDataToInt: {
				title: string | number;
				begin: string | number;
				end: string | number;
			} = {
				title: this.fillValue,
				begin: this.fillValue,
				end: this.fillValue,
			};
			try {
				convertedReadDataToInt = {
					title: this.values.includes(el.title) ? Number(el.title) : el.title,
					begin: el.title === '0' ? Number(el.begin) : el.begin,
					end: el.title === '0' ? Number(el.end) : el.end,
				};
			} catch (e) {
				throw new BadRequestException(
					`Проишошлка ошибка при конвертации в число: ${JSON.stringify(convertedReadDataToInt)}`,
				);
			}

			return {
				...el,
				...convertedReadDataToInt,
			};
		});
		return result;
	}
}
