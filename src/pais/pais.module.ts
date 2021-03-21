import { Module } from '@nestjs/common';
import { Pais } from './entities/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pais])],
  controllers: [PaisController],
  providers: [PaisService]
})
export class PaisModule {}
