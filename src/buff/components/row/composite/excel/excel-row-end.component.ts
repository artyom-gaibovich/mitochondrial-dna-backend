import * as Excel from 'exceljs';
import { EndRowComponentInterface } from './excel-row-component.interfaces';
import { ExtractedExcelRow } from '../../extracted-excel-row';
import { CheckedEmptyRow } from '../../checked/checked-empty-row';
import { TransformedToArrayRow } from '../../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../../cut-headers-by-options-row';
import { MergedEndAndBeginArray } from '../../merged/merged-end-and-begin.array';
import { CheckedToSeqHasSbEb } from '../../checked/checked-to-seq-has-sb-eb';
import { ConvertedToIntBeginEndOptions } from '../../convert/converted-to-int-begin-end-options';
import { DynamicsColumns } from '../../../column/dynamic-columns';
import { PrismaService } from '../../../../../prisma/prisma.service';

export class ExcelRowEndComponent implements EndRowComponentInterface {
	constructor(
		private row: Excel.Row,
		private currentRow: number,
		private errorsArray: any,
		private beginRangeRow: { title: string; index: number; begin: string; header: string }[],
		private prismaService: PrismaService,
	) {}

	process(): {
		title: string | number;
		index: number;
		header: string;
		begin: string | number;
		end: string | number;
	}[] {
		const extractedExcelRow = new ExtractedExcelRow(this.row).extract();
		new CheckedEmptyRow(extractedExcelRow, 'Конец диапазона : c = 3').check();
		const transformedToArrayRow = new TransformedToArrayRow(
			extractedExcelRow,
			null,
			this.currentRow,
			this.errorsArray,
		).extract();
		const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
			this.beginRangeRow,
			transformedToArrayRow,
			null,
		).cut();
		const mergedEndAndBeginArray = new MergedEndAndBeginArray(
			this.beginRangeRow,
			cutHeadersByOptionsRow,
		).merge();

		new CheckedToSeqHasSbEb(mergedEndAndBeginArray, null).check();
		const convertedToIntBeginEndOptions = new ConvertedToIntBeginEndOptions(
			mergedEndAndBeginArray,
			['1', '0', '2', '3'],
			null,
		).convert();
		return convertedToIntBeginEndOptions;
	}

	async createColumns(): Promise<void> {
		await new DynamicsColumns(this.process(), this.prismaService, 'buff', [0, 1, 2, 3]).create();
	}
}
