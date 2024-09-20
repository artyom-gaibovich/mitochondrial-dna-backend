import * as Excel from 'exceljs';
import { BadRequestException } from '@nestjs/common';

export class CheckedToRowHasValues {
	constructor(
		private row: { title: string; index: number }[],
		private rowName: string,
		private values: string[],
	) {}

	public check(): void {
		let flag = false;
		for (let i = 0; i < this.row.length; i++) {
			if (this.values.includes(this.row[i].title)) {
				flag = true;
			}
		}
		if (!flag) {
			throw new BadRequestException('Отстутвутют заголовки: ', this.rowName);
		}
	}
}
