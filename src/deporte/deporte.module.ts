import { Module } from '@nestjs/common';
import { Deporte } from './entities/deporte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeporteService } from './deporte.service';
import { DeporteController } from './deporte.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deporte])],
  controllers: [DeporteController],
  providers: [DeporteService]
})
export class DeporteModule {}
