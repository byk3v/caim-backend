import { Module } from '@nestjs/common';
import { Medio } from './entity/medios.entity';
import { MedioController } from './medio.controller';
import { MedioService } from './medio.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medio])],
  controllers: [MedioController],
  providers: [MedioService],
  exports: [MedioService],
})
export class MedioModule {}
