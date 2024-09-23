import * as Excel from 'exceljs';

export class TransformedObjectCellToString {
	constructor(private row: Excel.CellValue[]) {}

	transform(): Excel.CellValue[] {
		return this.row.map((el: Excel.CellValue) => {
			if (typeof el === 'object' && (el as object).hasOwnProperty('richText')) {
				const richTextArray = (el as any).richText;
				el = richTextArray.map((item: { text: string }) => item.text).join(' ');
			}
			return el;
		});
	}
}
