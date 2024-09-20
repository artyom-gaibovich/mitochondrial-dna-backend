import { BuffDataService } from '../../buff-data.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { DynamicColumn } from './dynamic-column';

export class DynamicsColumns {
	constructor(
		private data: {
			title: string | number;
			begin: string | number;
			end: string | number;
			index: number;
			header: string;
		}[],
		private prismaService: PrismaService,
		private tableName: string,
		private titleValues: number[],
	) {}

	async create() {
		for (let i = 0; i < this.data.length; i++) {
			if (this.titleValues.includes(this.data[i].title as number)) {
				await new DynamicColumn(
					this.tableName,
					this.data[i].header.toLowerCase(),
					this.prismaService,
				).create();
			}
		}
	}
}
