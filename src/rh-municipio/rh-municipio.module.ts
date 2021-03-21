import { Module } from '@nestjs/common';
import { Municipio } from './entities/rh-municipio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhMunicipioService } from './rh-municipio.service';
import { RhMunicipioController } from './rh-municipio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  controllers: [RhMunicipioController],
  providers: [RhMunicipioService]
})
export class RhMunicipioModule {}
