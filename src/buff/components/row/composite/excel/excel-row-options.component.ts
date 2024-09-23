import { BaseRowComponentInterface } from './excel-row-component.interfaces';
import { ExtractedExcelRow } from '../../extracted-excel-row';
import * as Excel from 'exceljs';
import { TransformedToArrayRow } from '../../transformed/transformed-to-array-row';
import { CheckedEmptyRow } from '../../checked/checked-empty-row';
import { FilledEmptySpaceRow } from '../../filled/filled-empty-space-row';

export class ExcelRowOptionsComponent implements BaseRowComponentInterface {
	constructor(private row: Excel.Row) {}

	process(): { index: number; title: string }[] {
		const extractedExcelRow = new ExtractedExcelRow(this.row).extract();
		new CheckedEmptyRow(extractedExcelRow, 'Опции : c = 0').check();
		const transformedToArrayRow = new TransformedToArrayRow(
			extractedExcelRow,
			null,
			0,
			[],
		).extract();
		const filledEmptySpaceRow = new FilledEmptySpaceRow(transformedToArrayRow, null).fill();
		const updatedOptions = filledEmptySpaceRow.map((el) => {
			if (el.title === 'pop') {
				el.title = 'popname';
			}
			return el;
		});
		return updatedOptions;
	}
}
