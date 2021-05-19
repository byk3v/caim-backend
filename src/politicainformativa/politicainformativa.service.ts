import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { PoliticaInformativa } from './entities/politicainformativa.entity'
  import { CreatePoliticaInformativaDto, PoliticaInformativaDTO } from './dto/politicainformativa.dto';
  import { toPoliticaInformativaDto } from '../utils/mapper';
  
  @Injectable()
export class PoliticaInfService {
    constructor(
      @InjectRepository(PoliticaInformativa)
      private readonly PoliticaInfRepository: Repository<PoliticaInformativa>
    ) {}
  
    async getPoliticaInformativa( nombre?: string): Promise<PoliticaInformativa[]> {
      /*if (nombre) {
        return await this.PoliticaInfRepository.find({ where: { nombre },
        });
      } else return await this.PoliticaInfRepository.find();*/
      const poli = await getConnection().createQueryBuilder()
        .select("politicainformativa")
        .from(PoliticaInformativa, "politicainformativa")
        .orderBy("politicainformativa.nombre") 
        .getMany();
        if (!poli)
          throw new NotFoundException(`No encontramos entradas de politica informativas`);
        return poli;
    }
  
    async getbyId(id: string) {
      const polinf = await this.PoliticaInfRepository.findOne(id);
      if (!polinf)
        throw new NotFoundException(`Esa entrada en Politica Informativa no existe`);
      return polinf;
    }
  
    async createPoliticaInformativa( dto: CreatePoliticaInformativaDto): Promise<PoliticaInformativaDTO> {
      const { nombre, descripcion } = dto;
  
      const poInfInDB = await this.PoliticaInfRepository.findOne({
        where: { nombre }
      });
  
      if (poInfInDB) {
        throw new HttpException(
          'Ese tema ya esta en Politica Informativa',
          HttpStatus.BAD_REQUEST,
        );
      }
      const polInf: PoliticaInformativa = await this.PoliticaInfRepository.create({ nombre, descripcion },);
      await this.PoliticaInfRepository.save(polInf);
      return toPoliticaInformativaDto(polInf);
    }
  
    async editPoliticaInformativa(dto: CreatePoliticaInformativaDto, id: string) {
      const politica = await this.PoliticaInfRepository.findOne(id);
      if (!politica)
        throw new NotFoundException(`Ese tema de politica informativa no existe en Base de Datos`);
  
      const politicaUpdated = Object.assign(politica, dto);
      return await this.PoliticaInfRepository.save(politicaUpdated);
    }
  
    async deletePoliticaInformativa(id: string) {
      return await this.PoliticaInfRepository.delete(id);
    }
  }
  