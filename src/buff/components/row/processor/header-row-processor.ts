import { RenamedToSnpStrSeqHeaders } from '../renamed-to-snp-str-seq-headers';
import { ExtractedExcelRow } from '../extracted-excel-row';
import { TransformedObjectCellToString } from '../transformed/transformed-object-cell-to-string';
import { TransformedToArrayRow } from '../transformed/transformed-to-array-row';
import { FilledEmptySpaceRow } from '../filled/filled-empty-space-row';
import { CutHeadersByOptionsRow } from '../cut-headers-by-options-row';
import { MergedHeadersAndOptionsArray } from '../merged/merged-headers-and-options-array';
import { ExcelRowProcessor } from './excel-row-processor';

export class HeaderRowProcessor extends ExcelRowProcessor {
	process(row: any): void {
		const extractedExcelRow = new ExtractedExcelRow(row).extract();
		const transformedObjectCellToString = new TransformedObjectCellToString(
			extractedExcelRow,
		).transform();
		const transformedToArrayRow = new TransformedToArrayRow(
			transformedObjectCellToString,
			null,
			1,
			[],
		).extract();
		const filledEmptySpaceRow = new FilledEmptySpaceRow(transformedToArrayRow, null).fill();
		const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
			this.mainData.options,
			filledEmptySpaceRow,
			null,
		).cut();
		const mergedHeadersAndOptionsArray = new MergedHeadersAndOptionsArray(
			this.mainData.options,
			cutHeadersByOptionsRow,
		).merge();
		const renamedHeaders = new RenamedToSnpStrSeqHeaders(mergedHeadersAndOptionsArray).rename();

		this.merge(renamedHeaders, 'headers');
	}
}
