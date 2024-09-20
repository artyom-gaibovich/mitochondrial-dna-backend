import * as Excel from 'exceljs';
import { ExcelFile } from '../entities/excel-file';
import { ExtractedExcelRow } from './components/row/extracted-excel-row';
import { TransformedToArrayRow } from './components/row/transformed-to-array-row';
import { FilledEmptySpaceRow } from './components/row/filled/filled-empty-space-row';
import { CutHeadersByOptionsRow } from './components/row/cut-headers-by-options-row';
import { MergedHeadersAndOptionsArray } from './components/row/merged/merged-headers-and-options-array';
import { RenamedToSnpStrSeqHeaders } from './components/row/renamed-to-snp-str-seq-headers';
import { MergedBeginAndHeadersArray } from './components/row/merged/merged-begin-and-headers.array';
import { MergedEndAndBeginArray } from './components/row/merged/merged-end-and-begin.array';
import { CheckedToSeqHasSbEb } from './components/row/checked/checked-to-seq-has-sb-eb';
import { CheckedEmptyRow } from './components/row/checked/checked-empty-row';
import { ConvertedToIntBeginEndOptions } from './components/row/convert/converted-to-int-begin-end-options';
import { DynamicsColumns } from './components/column/dynamic-columns';
import { PrismaService } from '../prisma/prisma.service';
import { DIConstants } from '../DIConstants';
import { Inject } from '@nestjs/common';
import { CheckedToRowHasValues } from './components/row/checked/checked-to-row-has-values';
import { MergedValuesAndEndArray } from './components/row/merged/merged-values-and-end.array';
import { ConvertedRowNValueToInt } from './components/row/convert/converted-row-n-value-to-int';
import { PreparedToInsertRecordIntoBuffVar } from './components/row/prepared/prepared-to-insert-record-into-buff-var';
import { FilledRowWithAdditionalColumns } from './components/row/filled/filled-row-with-additional-columns';
import { PreparedQueryToInsertBuff } from './components/query/prepared-query-to-insert-buff';
import { FilledSbEbZeros } from './components/row/filled/filled-sb-eb-zeros';
import { PreparedQueryToInsertBuffVar } from './components/query/prepared-query-to-insert-buff-var';
import { CreatedRowInDb } from './components/db/created-row-in-db';

export class BufferService {
	constructor(@Inject(DIConstants.PrismaService) private prismaService: PrismaService) {}

	async upload(file: ExcelFile): Promise<any> {
		const mainData: {
			options: { title: string; index: number }[];
			headers: { title: string; index: number; header: string }[];
			begin: { title: string; index: number; header: string; begin: string }[];
			end: {
				header: string;
				title: string | number;
				index: number;
				begin: string | number;
				end: string | number;
			}[];
			values: {
				title: string | number;
				index: number;
				begin: string | number;
				end: string | number;
			}[];
		} = {
			options: [],
			headers: [],
			begin: [],
			end: [],
			values: [],
		};
		let c = 0;
		const resultData: {
			errors: any[];
			rows: number;
		} = {
			errors: [],
			rows: 0,
		};
		const emptyData = [];
		const errorsArray = [];
		for await (const workSheetReader of new Excel.stream.xlsx.WorkbookReader(file.get(), {})) {
			for await (const row of workSheetReader) {
				if (c === 0) {
					const extractedExcelRow = new ExtractedExcelRow(row).extract();
					new CheckedEmptyRow(extractedExcelRow, 'Опции : c = 0').check();
					const transformedToArrayRow = new TransformedToArrayRow(
						extractedExcelRow,
						null,
						c,
						errorsArray,
					).extract();
					new CheckedToRowHasValues(transformedToArrayRow, 'Опции : c = 0', ['refname', 'indname']);
					const filledEmptySpaceRow = new FilledEmptySpaceRow(transformedToArrayRow, null).fill();
					mainData.options = filledEmptySpaceRow.map((el) => {
						if (el.title === 'pop') {
							el.title = 'popname';
						}
						return el;
					});

					c += 1;
					continue;
				}
				if (c === 1) {
					const extractedExcelRow = new ExtractedExcelRow(row).extract();
					const transformedToArrayRow = new TransformedToArrayRow(
						extractedExcelRow,
						null,
						c,
						errorsArray,
					).extract();
					new CheckedEmptyRow(extractedExcelRow, 'Заголовки : c = 1').check();

					const filledEmptySpaceRow = new FilledEmptySpaceRow(transformedToArrayRow, null).fill();
					const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
						mainData.options,
						filledEmptySpaceRow,
						null,
					).cut();
					const mergedHeadersAndOptionsArray = new MergedHeadersAndOptionsArray(
						mainData.options,
						cutHeadersByOptionsRow,
					).merge();
					mainData.headers = new RenamedToSnpStrSeqHeaders(mergedHeadersAndOptionsArray).rename();
					c += 1;
					continue;
				}
				if (c === 2) {
					const extractedExcelRow = new ExtractedExcelRow(row).extract();
					new CheckedEmptyRow(extractedExcelRow, 'Начало диапазона : c = 2').check();
					const transformedToArrayRow = new TransformedToArrayRow(
						extractedExcelRow,
						null,
						c,
						errorsArray,
					).extract();
					const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
						mainData.headers,
						transformedToArrayRow,
						null,
					).cut();
					mainData.begin = new MergedBeginAndHeadersArray(
						mainData.headers,
						cutHeadersByOptionsRow,
					).merge();
					c += 1;
					continue;
				}
				if (c == 3) {
					const extractedExcelRow = new ExtractedExcelRow(row).extract();
					new CheckedEmptyRow(extractedExcelRow, 'Конец диапазона : c = 3').check();
					const transformedToArrayRow = new TransformedToArrayRow(
						extractedExcelRow,
						null,
						c,
						errorsArray,
					).extract();
					const cutHeadersByOptionsRow = new CutHeadersByOptionsRow(
						mainData.begin,
						transformedToArrayRow,
						null,
					).cut();
					const mergedEndAndBeginArray = new MergedEndAndBeginArray(
						mainData.begin,
						cutHeadersByOptionsRow,
					).merge();

					new CheckedToSeqHasSbEb(mergedEndAndBeginArray, null).check();
					const convertedToIntBeginEndOptions = new ConvertedToIntBeginEndOptions(
						mergedEndAndBeginArray,
						['1', '0', '2', '3'],
						null,
					).convert();
					mainData.end = convertedToIntBeginEndOptions;
					await new DynamicsColumns(
						convertedToIntBeginEndOptions,
						this.prismaService,
						'buff',
						[0, 1, 2, 3],
					).create();
					c += 1;
					continue;
				}
				if (c > 3) {
					const extractedExcelRow = new ExtractedExcelRow(row).extract();
					const transformedToArrayRow = new TransformedToArrayRow(
						extractedExcelRow,
						null,
						c,
						errorsArray,
					).extract();
					const cutValuesByOptionsRow = new CutHeadersByOptionsRow(
						mainData.end,
						transformedToArrayRow,
						null,
					).cut();
					const mergedEndAndBeginArray = new MergedValuesAndEndArray(
						mainData.end,
						cutValuesByOptionsRow,
					).merge();

					const convertedRowNValueToInt = new ConvertedRowNValueToInt(
						mergedEndAndBeginArray,
						'n',
						c,
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

					// TODO Вот тут нужно обернуть в цепочку обязанностей
					//

					const filledSbEbZeros = new FilledSbEbZeros(
						insertRowAddedDefaultParam.count,
						insertRowAddedDefaultParam.data,
						[1, 2, 3],
					).fill();

					const preparedQueryToInsertBuff = new PreparedQueryToInsertBuff(
						insertRowAddedDefaultParam.count,
						insertRowAddedDefaultParam.data,
						[0, 1, 2, 3],
					).prepare();

					const returnedId = await new CreatedRowInDb(
						this.prismaService,
						preparedQueryToInsertBuff,
						'таблица buff',
					).create();

					const preparedQueryToInsertBuffVar = new PreparedQueryToInsertBuffVar(
						returnedId[0].buffid,
						filledSbEbZeros.dataToInsert,
						[0, 1, 2, 3],
					).prepare();

					const result = await new CreatedRowInDb(
						this.prismaService,
						preparedQueryToInsertBuffVar,
						'таблица buff_var',
					).create();
					c += 1;
				}
			}
			return errorsArray;
		}
		return emptyData;
	}
}
