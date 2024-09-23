import * as Excel from 'exceljs';
import { BaseRowComponentInterface, HeadersRowComponentInterface } from './excel-row-component.interfaces';
import { ExtractedExcelRow } from '../../extracted-excel-row';
import { TransformedObjectCellToString } from '../../transformed/transformed-object-cell-to-string';
import { TransformedToArrayRow } from '../../transformed/transformed-to-array-row';
import { FilledEmptySpaceRow } from '../../filled/filled-empty-space-row';
import { CutHeadersByOptionsRow } from '../../cut-headers-by-options-row';
import { MergedHeadersAndOptionsArray } from '../../merged/merged-headers-and-options-array';
import { RenamedToSnpStrSeqHeaders } from '../../renamed-to-snp-str-seq-headers';

export class ExcelRowHeadersComponent implements HeadersRowComponentInterface {
	constructor(
		private row: Excel.Row,
		private options: { title: string; index: number }[],
	) {}

	process(): { title: string; header: string; index: number }[] {
		const extractedExcelRow = new ExtractedExcelRow(this.row).extract();
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
			this.options,
			filledEmptySpaceRow,
			null,
		).cut();
		const mergedHeadersAndOptionsArray = new MergedHeadersAndOptionsArray(
			this.options,
			cutHeadersByOptionsRow,
		).merge();
		const renamedHeaders = new RenamedToSnpStrSeqHeaders(mergedHeadersAndOptionsArray).rename();
		return renamedHeaders;
	}
}
