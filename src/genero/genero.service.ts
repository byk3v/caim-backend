import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { GeneroPeriodistico } from './entities/genero.entity'
  import { CreateGeneroPeriodisticoDto, GeneroPeriodisticoDTO } from './dto/genero.dto';
  import { toGeneroDto } from '../utils/mapper';
  
  @Injectable()
export class GeneroService {
    constructor(
      @InjectRepository(GeneroPeriodistico)
      private readonly GeneroRepository: Repository<GeneroPeriodistico>
    ) {}
  
    async getGeneros( nombre?: string): Promise<GeneroPeriodistico[]> {
      if (nombre) {
        return await this.GeneroRepository.find({ where: { nombre },
        });
      } else return await this.GeneroRepository.find();
    }
  
    async getbyId(id: string) {
      const genero = await this.GeneroRepository.findOne(id);
      if (!genero)
        throw new NotFoundException(`Ese genero no existe`);
      return genero;
    }
  
    async createGenero( dto: CreateGeneroPeriodisticoDto): Promise<GeneroPeriodisticoDTO> {
      const { nombre, descripcion } = dto;
  
      const generoInDB = await this.GeneroRepository.findOne({
        where: { nombre }
      });
  
      if (generoInDB) {
        throw new HttpException(
          'Un genero con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const genero: GeneroPeriodistico = await this.GeneroRepository.create({ nombre, descripcion },);
      await this.GeneroRepository.save(genero);
      return toGeneroDto(genero);
    }
  
    async editGenero(dto: GeneroPeriodisticoDTO, id: string) {
      const genero = await this.GeneroRepository.findOne(id);
      if (!genero)
        throw new NotFoundException(`Ese genero no existe en Base de Datos`);
  
      const generoUpdated = Object.assign(genero, dto);
      return await this.GeneroRepository.save(generoUpdated);
    }
  
    async deleteGenero(id: string) {
      return await this.GeneroRepository.delete(id);
    }
  }
  