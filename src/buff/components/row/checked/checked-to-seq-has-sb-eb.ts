import { BadRequestException } from '@nestjs/common';

export class CheckedToSeqHasSbEb {
	constructor(
		private readData: {
			title: string;
			index: number;
			header: string;
			begin: string;
			end: string;
		}[],
		private emptyValue: '' | null,
	) {}

	check(): void {
		for (let i = 0; i < this.readData.length; i++) {
			if (
				this.readData[i].title === '0' &&
				(this.readData[i].begin === this.emptyValue || this.readData[i].end === this.emptyValue)
			) {
				throw new BadRequestException(
					`У seq с наименованием ${this.readData[i].header} отсутствует eb, sb 3, 4-ой строке`,
				);
			}
		}
	}
}
