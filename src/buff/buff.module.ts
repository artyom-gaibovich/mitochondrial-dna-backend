import { Module } from '@nestjs/common';
import { BuffController } from './buff.controller';

@Module({
  controllers: [BuffController],
})
export class BuffModule {}
