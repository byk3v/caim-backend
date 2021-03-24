import { Module } from '@nestjs/common';
import { Periodista } from './entities/periodista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodistaService } from './periodista.service';
import { PeriodistaController } from './periodista.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Periodista])],
  controllers: [PeriodistaController],
  providers: [PeriodistaService]
})
export class PeriodistaModule {}
