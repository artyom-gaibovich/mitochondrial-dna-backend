import { BadRequestException } from '@nestjs/common';

export class CheckedRangeSbEb {
	constructor(
		private readData: {
			title: string;
			index: number;
			header: string;
			begin: string;
			end: string;
		}[],
	) {}

	check(): void {
		for (let i = 0; i < this.readData.length; i++) {
			if (
				this.readData[i].title === '0' &&
				(this.readData[i].begin === '' || this.readData[i].end === '')
			) {
				throw new BadRequestException(
					`У seq с наименованием ${this.readData[i].header} отсутствует eb, sb 3, 4-ой строке`,
				);
			}
		}
	}
}
