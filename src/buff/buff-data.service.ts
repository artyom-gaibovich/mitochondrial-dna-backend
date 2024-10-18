import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import console from 'node:console';

@Injectable()
export class BuffDataService {
	constructor(private prismaService: PrismaService) {}

	public async clear(): Promise<{ count: number }> {
		return await this.prismaService.buff.deleteMany();
	}

	async createColumn(columnName: string): Promise<void> {
		const tableName = 'buff';
		const errors: any = [];
		const columnExists = await this.prismaService.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = ${tableName} AND column_name = ${columnName.toLowerCase()}
  `;
		if ((columnExists as { column_name: string }[]).length === 0) {
			try {
				const result = await this.prismaService.$executeRawUnsafe(`
      ALTER TABLE ${tableName} ADD COLUMN ${columnName.toLowerCase()} VARCHAR(255);
        `);
				console.log(result);
				``;
				console.log(`Column ${columnName} added to table ${tableName}.`);
			} catch (err) {
				errors.push(err);
			}
		} else {
			console.log(`Column ${columnName} already exists in table ${tableName}.`);
		}
		if (errors.length) {
			throw new BadRequestException(`
			[context: BufferService/addColumnToBuffIfNotExists]
			[columnName:${columnName}]
			`);
		}
	}
}
