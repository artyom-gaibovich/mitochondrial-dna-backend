import console from 'node:console';
import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

export class DynamicColumn {
	constructor(
		private tableName: string,
		private columnName: string,
		private prisma: PrismaService,
	) {}

	async create(): Promise<void> {
		const errors: any = [];
		const columnExists = await this.prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = ${this.tableName} AND column_name = ${this.columnName.toLowerCase()}
  `;
		if ((columnExists as { column_name: string }[]).length === 0) {
			try {
				const result = await this.prisma.$executeRawUnsafe(`
      ALTER TABLE ${this.tableName} ADD COLUMN ${this.columnName.toLowerCase()} VARCHAR(255);
        `);
				console.log(result);
				``;
				console.log(`Column ${this.columnName} added to table ${this.tableName}.`);
			} catch (err) {
				errors.push(err);
			}
		} else {
			console.log(`Column ${this.columnName} already exists in table ${this.tableName}.`);
		}
		if (errors.length) {
			throw new BadRequestException(`
			[context: DynamicColumn/create]
			[columnName:${this.columnName}]
			[tableName:${this.tableName}]
			`);
		}
	}
}
