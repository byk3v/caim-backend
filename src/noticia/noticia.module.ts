import { Module } from '@nestjs/common';
import { Noticia } from './entity/noticia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiaController } from './noticia.controller';
import { NoticiaService } from './noticia.service';
import { EmisionModule } from 'src/emision/emision.module';

@Module({
  imports: [EmisionModule, TypeOrmModule.forFeature([Noticia])],
  controllers: [NoticiaController],
  providers: [NoticiaService],
  exports: [NoticiaService],
})
export class NoticiaModule {}
