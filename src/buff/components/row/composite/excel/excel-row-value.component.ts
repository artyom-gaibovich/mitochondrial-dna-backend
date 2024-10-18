import * as Excel from 'exceljs';
import { ValueRowComponentInterface } from './excel-row-component.interfaces';
import { ExtractedExcelRow } from '../../extracted-excel-row';
import { TransformedObjectCellToString } from '../../transformed/transformed-object-cell-to-string';
import { TransformedToArrayRow } from '../../transformed/transformed-to-array-row';
import { CutHeadersByOptionsRow } from '../../cut-headers-by-options-row';
import { MergedValuesAndEndArray } from '../../merged/merged-values-and-end.array';
import { ConvertedRowNValueToInt } from '../../convert/converted-row-n-value-to-int';
import { PreparedToInsertRecordIntoBuffVar } from '../../prepared/prepared-to-insert-record-into-buff-var';
import { FilledRowWithAdditionalColumns } from '../../filled/filled-row-with-additional-columns';
import { FilledSbEbZeros } from '../../filled/filled-sb-eb-zeros';
import { PreparedQueryToInsertBuff } from '../../../query/prepared-query-to-insert-buff';
import { CreatedRowInDb } from '../../../db/created-row-in-db';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { PreparedQueryToInsertBuffVar } from '../../../query/prepared-query-to-insert-buff-var';

export class ExcelRowValueComponent implements ValueRowComponentInterface {
	constructor(
		private row: Excel.Row,
		private currentRow: number,
		private errorsArray: any,
		private endRangeRow: {
			title: string | number;
			index: number;
			header: string;
			begin: string | number;
			end: string | number;
		}[],
		private prismaService: PrismaService,
	) {}

	process(): {
		count: number;
		dataToInsert: {
			column: string;
			value: string | number;
			title: number | null;
			sb: number;
			eb: number;
		}[];
	} {
		const extractedExcelRow = new ExtractedExcelRow(this.row).extract();
		const transformedObjectCellToString = new TransformedObjectCellToString(
			extractedExcelRow,
		).transform();
		if (!extractedExcelRow.length) {
			return;
		}
		const transformedToArrayRow = new TransformedToArrayRow(
			transformedObjectCellToString,
			null,
			this.currentRow,
			this.errorsArray,
		).extract();
		const cutValuesByOptionsRow = new CutHeadersByOptionsRow(
			this.endRangeRow,
			transformedToArrayRow,
			null,
		).cut();
		const mergedEndAndBeginArray = new MergedValuesAndEndArray(
			this.endRangeRow,
			cutValuesByOptionsRow,
		).merge();

		const convertedRowNValueToInt = new ConvertedRowNValueToInt(
			mergedEndAndBeginArray,
			'n',
			this.currentRow,
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

		return new FilledSbEbZeros(
			insertRowAddedDefaultParam.count,
			insertRowAddedDefaultParam.data,
			[1, 2, 3],
		).fill();
	}

	toSQLBuff(): string {
		return new PreparedQueryToInsertBuff(
			this.process().count,
			this.process().dataToInsert,
			[0, 1, 2, 3],
		).prepare();
	}

	async executeSQLBuff(): Promise<number> {
		return await new CreatedRowInDb(this.prismaService, this.toSQLBuff(), 'таблица buff').create();
	}

	async executeSQLBuffVar(): Promise<void> {
		await new CreatedRowInDb(
			this.prismaService,
			await this.toSQLBuffVar(),
			'таблица buff_var',
		).create();
	}

	async toSQLBuffVar(): Promise<string> {
		return new PreparedQueryToInsertBuffVar(
			await await this.executeSQLBuff()[0].buffid,
			this.process().dataToInsert,
			[0, 1, 2, 3],
		).prepare();
	}
}
