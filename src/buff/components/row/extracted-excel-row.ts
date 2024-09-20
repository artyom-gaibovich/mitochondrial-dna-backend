import * as Excel from 'exceljs';

export class ExtractedExcelRow {
	constructor(private row: Excel.Row) {}

	extract(): Excel.CellValue[] {
		return this.row.values as Excel.CellValue[];
	}
}
