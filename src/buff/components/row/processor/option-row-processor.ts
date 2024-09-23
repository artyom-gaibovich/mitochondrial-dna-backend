import { CheckedEmptyRow } from '../checked/checked-empty-row';
import { ExtractedExcelRow } from '../extracted-excel-row';
import { TransformedToArrayRow } from '../transformed/transformed-to-array-row';
import { FilledEmptySpaceRow } from '../filled/filled-empty-space-row';
import { ExcelRowProcessor } from './excel-row-processor';

export class OptionRowProcessor extends ExcelRowProcessor {
	process(row: any): void {
		const extractedExcelRow = new ExtractedExcelRow(row).extract();
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

		this.merge(updatedOptions, 'options');
	}
}
