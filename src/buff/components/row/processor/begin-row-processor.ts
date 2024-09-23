import { ExtractedExcelRow } from '../extracted-excel-row';
import { CheckedEmptyRow } from '../checked/checked-empty-row';
import { TransformedToArrayRow } from '../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../cut-headers-by-options-row';
import { MergedBeginAndHeadersArray } from '../merged/merged-begin-and-headers.array';
import { ExcelRowProcessor } from './excel-row-processor';

export class BeginRowProcessor extends ExcelRowProcessor {
	process(row: any): void {
		const extractedExcelRow = new ExtractedExcelRow(row).extract();
		new CheckedEmptyRow(extractedExcelRow, 'Начало диапазона : c = 2').check();
		const transformedToArrayRow = new TransformedToArrayRow(
			extractedExcelRow,
			null,
			this.c,
			this.errorsArray,
		).extract();
		const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
			this.mainData.headers,
			transformedToArrayRow,
			null,
		).cut();
		const mergedBeginAndHeadersArray = new MergedBeginAndHeadersArray(
			this.mainData.headers,
			cutHeadersByOptionsRow,
		).merge();

		this.merge(mergedBeginAndHeadersArray, 'begin');
	}
}
