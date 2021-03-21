import { Module } from '@nestjs/common';
import { GeneroPeriodistico } from './entities/genero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GeneroPeriodistico])],
  controllers: [GeneroController],
  providers: [GeneroService]
})
export class GeneroModule {}
