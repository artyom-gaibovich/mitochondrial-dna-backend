import * as Excel from 'exceljs';
import { BadRequestException } from '@nestjs/common';

export class TransformedToArrayRow {
	constructor(
		private rowToExtract: Excel.CellValue[],
		private fillValue: '' | null,
		private currentRowNumber: number,
		private errors: any[],
	) {}

	extract(): { title: string; index: number }[] {
		const result = this.rowToExtract.map((element, index) => {
			return {
				title: String(element),
				index: index,
			};
		});
		const start = 0;
		let end;
		try {
			end = result[result.length - 1].index;
		} catch (e) {
			this.errors.push(
				`У этого массива отстутвует такой элемент:[Строка таблицы]:${this.currentRowNumber} [Массив] :${JSON.stringify(
					this.rowToExtract,
				)}`,
			);
		}

		for (let i = start; i < end; i++) {
			if (!result[i]) {
				result.push({
					title: this.fillValue,
					index: i,
				});
			}
		}
		return result.sort((a, b) => a.index - b.index).filter((el) => el !== undefined);
	}
}
