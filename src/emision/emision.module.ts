import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmisionService } from './emision.service';
import { EmisionController } from './emision.controller';
import { Emision } from './entity/emision.entity';
import { CanalModule } from '../canal/canal.module'

@Module({
  imports: [CanalModule, TypeOrmModule.forFeature([Emision])],
  providers: [EmisionService],
  controllers: [EmisionController],
  exports: [EmisionService],
})
export class EmisionModule {}
