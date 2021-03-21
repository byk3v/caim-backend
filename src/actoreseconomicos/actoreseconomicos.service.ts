import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { ActoresEconomicos } from './entities/actoreseconomico.entity'
  import { CreateActoresEconomicosDto, ActoresEconomicosDto } from './dto/actoreseconomicos.dto';
  import { toActorEconomicoDto } from '../utils/mapper';
  
  @Injectable()
export class ActoreseconomicosService {
    constructor(
      @InjectRepository(ActoresEconomicos)
      private readonly ActoresRepository: Repository<ActoresEconomicos>
    ) {}
  
    async getActores( nombre?: string): Promise<ActoresEconomicos[]> {
      if (nombre) {
        return await this.ActoresRepository.find({ where: { nombre },
        });
      } else return await this.ActoresRepository.find();
    }
  
    async getbyId(id: string) {
      const actores = await this.ActoresRepository.findOne(id);
      if (!actores)
        throw new NotFoundException(`Ese Actor Economico no existe`);
      return actores;
    }
  
    async createActorEconomico( dto: CreateActoresEconomicosDto): Promise<ActoresEconomicosDto> {
      const { nombre, descripcion } = dto;
  
      const ActoresInDB = await this.ActoresRepository.findOne({
        where: { nombre }
      });
  
      if (ActoresInDB) {
        throw new HttpException(
          'Un Actor Economico con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const actores: ActoresEconomicos = await this.ActoresRepository.create({ nombre, descripcion },);
      await this.ActoresRepository.save(actores);
      return toActorEconomicoDto(actores);
    }
  
    async editActores(dto: CreateActoresEconomicosDto, id: string) {
      const actores = await this.ActoresRepository.findOne(id);
      if (!actores)
        throw new NotFoundException(`Ese Actor economico no existe en Base de Datos`);
  
      const ActoresUpdated = Object.assign(actores, dto);
      return await this.ActoresRepository.save(ActoresUpdated);
    }
  
    async deleteActores(id: string) {
      return await this.ActoresRepository.delete(id);
    }
  }
  