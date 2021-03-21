import { Module } from '@nestjs/common';
import { Provincia } from './entities/rh-provincia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhProvinciaService } from './rh-provincia.service';
import { RhProvinciaController } from './rh-provincia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  controllers: [RhProvinciaController],
  providers: [RhProvinciaService]
})
export class RhProvinciaModule {}
