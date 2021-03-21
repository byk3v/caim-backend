import { Module } from '@nestjs/common';
import { Contrato } from './entities/rh-contrato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhContratoService } from './rh-contrato.service';
import { RhContratoController } from './rh-contrato.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato])],
  controllers: [RhContratoController],
  providers: [RhContratoService]
})
export class RhContratoModule {}
