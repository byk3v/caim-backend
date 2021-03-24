import { Module } from '@nestjs/common';
import { Programapreview } from './entities/programapreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramapreviewService } from './programapreview.service';
import { ProgramapreviewController } from './programapreview.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Programapreview])],
  controllers: [ProgramapreviewController],
  providers: [ProgramapreviewService]
})
export class ProgramapreviewModule {}
