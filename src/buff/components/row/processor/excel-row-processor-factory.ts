import { OptionRowProcessor } from './option-row-processor';
import { ExcelRowProcessor } from './excel-row-processor';
import { HeaderRowProcessor } from './header-row-processor';
import { BeginRowProcessor } from './begin-row-processor';
import { EndRowProcessor } from './end-row-processor';
import { ValueRowProcessor } from './value-row-processor';

//TODO добавить ENUM для каждого кейса

export class ExcelRowProcessorFactory {
	static createProcessor(c: number, mainData: any, errorsArray: any): ExcelRowProcessor {
		switch (c) {
			case 0:
				return new OptionRowProcessor(mainData, errorsArray, c);
			case 1:
				return new HeaderRowProcessor(mainData, errorsArray, c);
			case 2:
				return new BeginRowProcessor(mainData, errorsArray, c);
			case 3:
				return new EndRowProcessor(mainData, errorsArray, c);
			default:
				return new ValueRowProcessor(mainData, errorsArray, c);
		}
	}
}
