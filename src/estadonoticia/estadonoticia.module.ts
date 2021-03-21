import { Module } from '@nestjs/common';
import { EstadoNoticia } from './entities/estadonoticia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadonoticiaService } from './estadonoticia.service';
import { EstadonoticiaController } from './estadonoticia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoNoticia])],
  controllers: [EstadonoticiaController],
  providers: [EstadonoticiaService]
})
export class EstadonoticiaModule {}
