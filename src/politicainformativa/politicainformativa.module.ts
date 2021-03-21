import { Module } from '@nestjs/common';
import { PoliticaInformativa } from './entities/politicainformativa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticaInfService } from './politicainformativa.service';
import { PoliticainformativaController } from './politicainformativa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PoliticaInformativa])],
  controllers: [PoliticainformativaController],
  providers: [PoliticaInfService]
})
export class PoliticainformativaModule {}
