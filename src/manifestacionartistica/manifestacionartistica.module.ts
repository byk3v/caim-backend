import { Module } from '@nestjs/common';
import { ManifestacionArtistica } from './entities/manifestacionartistica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManifestacionartisticaService } from './manifestacionartistica.service';
import { ManifestacionartisticaController } from './manifestacionartistica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ManifestacionArtistica])],
  controllers: [ManifestacionartisticaController],
  providers: [ManifestacionartisticaService]
})
export class ManifestacionartisticaModule {}
