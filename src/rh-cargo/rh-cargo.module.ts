import { Module } from '@nestjs/common';
import { Cargo } from './entities/rh-cargo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhCargoService } from './rh-cargo.service';
import { RhCargoController } from './rh-cargo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
  controllers: [RhCargoController],
  providers: [RhCargoService]
})
export class RhCargoModule {}
