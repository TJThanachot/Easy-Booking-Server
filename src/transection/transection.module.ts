import { Module } from '@nestjs/common';
import { TransectionService } from './transection.service';
import { TransectionController } from './transection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transection } from './entities/transection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transection])],
  controllers: [TransectionController],
  providers: [TransectionService],
})
export class TransectionModule {}
