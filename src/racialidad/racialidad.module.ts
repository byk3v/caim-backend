import { Module } from '@nestjs/common';
import { Racialidad } from './entities/racialidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacialidadService } from './racialidad.service';
import { RacialidadController } from './racialidad.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Racialidad])],
  controllers: [RacialidadController],
  providers: [RacialidadService]
})
export class RacialidadModule {}
