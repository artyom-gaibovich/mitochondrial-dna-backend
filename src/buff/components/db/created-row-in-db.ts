import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { query } from 'express';

export class CreatedRowInDb {
	constructor(
		private prisma: PrismaService,
		private query: string,
		private context: string,
	) {}

	async create(): Promise<number> {
		let result;
		try {
			result = await this.prisma.$queryRawUnsafe(this.query);
			console.log(this.query);
			console.log(result[0].buffid);
		} catch (e) {
			throw new BadRequestException(
				`Произошла ошибка при вставке в ${this.context}:
				[Запрос:${this.query}]
			`,
			);
		}
		return result;
	}
}
