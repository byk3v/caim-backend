import { Module } from '@nestjs/common';
import { TarifaCargo } from './entities/rh-tarifaxcargo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhTarifaxcargoService } from './rh-tarifaxcargo.service';
import { RhTarifaxcargoController } from './rh-tarifaxcargo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TarifaCargo])],
  controllers: [RhTarifaxcargoController],
  providers: [RhTarifaxcargoService]
})
export class RhTarifaxcargoModule {}
