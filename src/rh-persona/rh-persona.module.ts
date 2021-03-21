import { Module } from '@nestjs/common';
import { Persona } from './entities/rh-persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RhPersonaService } from './rh-persona.service';
import { RhPersonaController } from './rh-persona.controller';
import { MulterModule } from '@nestjs/platform-express';

let optMulter= {
  useFactory: () => ({
    dest: './upload/fotos/personas',
    filename: (req, file, cb)=>{
      cb(null, file.originalname)
  }
  }),
};

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), MulterModule.registerAsync(optMulter)],
  controllers: [RhPersonaController],
  providers: [RhPersonaService]
})
export class RhPersonaModule {}
