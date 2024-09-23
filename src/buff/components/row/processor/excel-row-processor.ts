import { PrismaService } from '../../../../prisma/prisma.service';

export abstract class ExcelRowProcessor {
	protected mainData: any;
	protected errorsArray: any;
	protected c: number;

	constructor(mainData: any, errorsArray: any, c: number) {
		this.mainData = mainData;
		this.errorsArray = errorsArray;
		this.c = c;
	}

	abstract process(row: any): void;

	merge(newData: any, targetField: string): void {
		this.mainData[targetField] = newData;
	}

	get(): any {
		return this.mainData;
	}
}
