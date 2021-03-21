import { Module } from '@nestjs/common';
import { Territorio } from './entities/territorio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerritorioService } from './territorio.service';
import { TerritorioController } from './territorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Territorio])],
  controllers: [TerritorioController],
  providers: [TerritorioService]
})
export class TerritorioModule {}
