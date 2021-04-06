import { Module } from '@nestjs/common';
import { Indicacion } from './entities/indicaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicacionesService } from './indicaciones.service';
import { IndicacionesController } from './indicaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Indicacion])],
  controllers: [IndicacionesController],
  providers: [IndicacionesService]
})
export class IndicacionesModule {}
