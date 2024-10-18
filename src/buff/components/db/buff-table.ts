import { PrismaService } from '../../../prisma/prisma.service';

export class BuffTable {
	constructor(private prismaService: PrismaService) {}

	async recreate(): Promise<{ message: string }> {
		try {
			await this.prismaService.$executeRawUnsafe(`select recreate_buff();`);
			return {
				message: 'Пересоздание буффера прошло успешно!',
			};
		} catch (e) {
			return {
				message: `В процессе пересоздания буффера произошла ошибка: ${JSON.stringify(e)}`,
			};
		}
	}
}
