import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanalController } from './canal.controller';
import { CanalService } from './canal.service';
import { Canal } from './entity/canal.entity';
import { Medio } from '../medio/entity/medios.entity';
import { MedioModule} from '../medio/medio.module'

@Module({
  imports: [MedioModule, TypeOrmModule.forFeature([Canal])],
  controllers: [CanalController],
  providers: [CanalService],
  exports: [CanalService],
})
export class CanalModule {}
