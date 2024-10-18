import { BeginRowComponentInterface } from './excel-row-component.interfaces';
import { ExtractedExcelRow } from '../../extracted-excel-row';
import { CheckedEmptyRow } from '../../checked/checked-empty-row';
import { TransformedToArrayRow } from '../../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../../cut-headers-by-options-row';
import { MergedBeginAndHeadersArray } from '../../merged/merged-begin-and-headers.array';
import * as Excel from 'exceljs';

export class ExcelRowBeginComponent implements BeginRowComponentInterface {
	constructor(
		private row: Excel.Row,
		private currentRow: number,
		private errorsArray: any,
		private headers: { title: string; header: string; index: number }[],
	) {}

	process(): { title: string; begin: string; index: number; header: string }[] {
		const extractedExcelRow = new ExtractedExcelRow(this.row).extract();
		new CheckedEmptyRow(extractedExcelRow, 'Начало диапазона : c = 2').check();
		const transformedToArrayRow = new TransformedToArrayRow(
			extractedExcelRow,
			null,
			this.currentRow,
			this.errorsArray,
		).extract();
		const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
			this.headers,
			transformedToArrayRow,
			null,
		).cut();
		const mergedBeginAndHeadersArray = new MergedBeginAndHeadersArray(
			this.headers,
			cutHeadersByOptionsRow,
		).merge();
		return mergedBeginAndHeadersArray;
	}
}
