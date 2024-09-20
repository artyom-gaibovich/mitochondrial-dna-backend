import { Module } from '@nestjs/common';
import { BuffModule } from './buff/buff.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [BuffModule, PrismaModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
