import { BadRequestException } from '@nestjs/common';
import * as Excel from 'exceljs';

export class CheckedEmptyRow {
	constructor(
		private row: Excel.CellValue[],
		private rowName: string,
	) {}

	public check(): void {
		if (!this.row.length) {
			throw new BadRequestException(`Пустая строка у ${this.rowName}`);
		}
	}
}
