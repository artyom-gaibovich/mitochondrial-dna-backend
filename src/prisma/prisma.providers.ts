import { PrismaService } from './prisma.service';
import { Provider } from '@nestjs/common';
import { DIConstants } from '../DIConstants';

export const prismaProviders: Provider[] = [
	{
		provide: DIConstants.PrismaService,
		useClass: PrismaService,
	},
];
