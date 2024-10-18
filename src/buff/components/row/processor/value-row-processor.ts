import { ExcelRowProcessor } from './excel-row-processor';
import { ExtractedExcelRow } from '../extracted-excel-row';
import { TransformedObjectCellToString } from '../transformed/transformed-object-cell-to-string';
import { TransformedToArrayRow } from '../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../cut-headers-by-options-row';
import { MergedValuesAndEndArray } from '../merged/merged-values-and-end.array';
import { ConvertedRowNValueToInt } from '../convert/converted-row-n-value-to-int';
import { PreparedToInsertRecordIntoBuffVar } from '../prepared/prepared-to-insert-record-into-buff-var';
import { FilledRowWithAdditionalColumns } from '../filled/filled-row-with-additional-columns';
import { FilledSbEbZeros } from '../filled/filled-sb-eb-zeros';

export class ValueRowProcessor extends ExcelRowProcessor {
	process(row: any): void {
		const extractedExcelRow = new ExtractedExcelRow(row).extract();
		const transformedObjectCellToString = new TransformedObjectCellToString(
			extractedExcelRow,
		).transform();
		if (!extractedExcelRow.length) {
			return;
		}
		const transformedToArrayRow = new TransformedToArrayRow(
			transformedObjectCellToString,
			null,
			this.c,
			this.errorsArray,
		).extract();
		const cutValuesByOptionsRow = new CutHeadersByOptionsRow(
			this.mainData.end,
			transformedToArrayRow,
			null,
		).cut();
		const mergedEndAndBeginArray = new MergedValuesAndEndArray(
			this.mainData.end,
			cutValuesByOptionsRow,
		).merge();

		const convertedRowNValueToInt = new ConvertedRowNValueToInt(
			mergedEndAndBeginArray,
			'n',
			this.c,
		).convert();





		const preparedToInsertRecordIntoBuffVar = new PreparedToInsertRecordIntoBuffVar(
			convertedRowNValueToInt,
			[0, 1, 2, 3],
			convertedRowNValueToInt.map((el) => {
				if (![0, 1, 2, 3, null, 'n'].includes(el.title)) {
					return el.title;
				}
			}) as string[],
			'n',
		).prepare();

		const insertRowAddedDefaultParam = new FilledRowWithAdditionalColumns(
			preparedToInsertRecordIntoBuffVar.count,
			preparedToInsertRecordIntoBuffVar.dataToInsert,
			[
				{
					column: 'reftype',
					value: 'Paper',
					title: null,
					sb: null,
					eb: null,
				},
				{
					column: 'poptype',
					value: 'POP',
					title: null,
					sb: null,
					eb: null,
				},
			],
		).add();

		const filledSbEbZeros = new FilledSbEbZeros(
			insertRowAddedDefaultParam.count,
			insertRowAddedDefaultParam.data,
			[1, 2, 3],
		).fill();

		this.merge(filledSbEbZeros, 'values');
	}
}
