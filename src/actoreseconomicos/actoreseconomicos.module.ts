import { Module } from '@nestjs/common';
import { ActoresEconomicos } from './entities/actoreseconomico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActoreseconomicosService } from './actoreseconomicos.service';
import { ActoreseconomicosController } from './actoreseconomicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActoresEconomicos])],
  controllers: [ActoreseconomicosController],
  providers: [ActoreseconomicosService]
})
export class ActoreseconomicosModule {}
