import { ExcelRowProcessor } from './excel-row-processor';
import { ExtractedExcelRow } from '../extracted-excel-row';
import { CheckedEmptyRow } from '../checked/checked-empty-row';
import { TransformedToArrayRow } from '../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../cut-headers-by-options-row';
import { MergedEndAndBeginArray } from '../merged/merged-end-and-begin.array';
import { CheckedToSeqHasSbEb } from '../checked/checked-to-seq-has-sb-eb';
import { ConvertedToIntBeginEndOptions } from '../convert/converted-to-int-begin-end-options';

export class EndRowProcessor extends ExcelRowProcessor {
	process(row: any) {
		const extractedExcelRow = new ExtractedExcelRow(row).extract();
		new CheckedEmptyRow(extractedExcelRow, 'Конец диапазона : c = 3').check();
		const transformedToArrayRow = new TransformedToArrayRow(
			extractedExcelRow,
			null,
			this.c,
			this.errorsArray,
		).extract();
		const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
			this.mainData.begin,
			transformedToArrayRow,
			null,
		).cut();
		const mergedEndAndBeginArray = new MergedEndAndBeginArray(
			this.mainData.begin,
			cutHeadersByOptionsRow,
		).merge();

		new CheckedToSeqHasSbEb(mergedEndAndBeginArray, null).check();
		const convertedToIntBeginEndOptions = new ConvertedToIntBeginEndOptions(
			mergedEndAndBeginArray,
			['1', '0', '2', '3'],
			null,
		).convert();
		this.merge(convertedToIntBeginEndOptions, 'end');
	}
}
