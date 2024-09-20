import { Module } from '@nestjs/common';
import { BuffController } from './buff.controller';
import { BufferService } from './buffer.service';
import { BuffDataService } from './buff-data.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [BuffController],
	providers: [BufferService],
})
export class BuffModule {}
