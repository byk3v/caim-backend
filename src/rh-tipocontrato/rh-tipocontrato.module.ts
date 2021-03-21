import { Module } from '@nestjs/common';
import { TipoContrato } from './entities/rh-tipocontrato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhTipocontratoService } from './rh-tipocontrato.service';
import { RhTipocontratoController } from './rh-tipocontrato.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoContrato])],
  controllers: [RhTipocontratoController],
  providers: [RhTipocontratoService]
})
export class RhTipocontratoModule {}
