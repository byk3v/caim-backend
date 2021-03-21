import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Territorio } from './entities/territorio.entity'
  import { CreateTerritorioDto, TerritorioDTO } from './dto/territorio.dto';
  import { toTerritorioDto } from '../utils/mapper';
  
  @Injectable()
export class TerritorioService {
    constructor(
      @InjectRepository(Territorio)
      private readonly TerritorioRepository: Repository<Territorio>
    ) {}
  
    async getTerritorios( nombre?: string): Promise<Territorio[]> {
      if (nombre) {
        return await this.TerritorioRepository.find({ where: { nombre },
        });
      } else return await this.TerritorioRepository.find();
    }
  
    async getbyId(id: string) {
      const territorio = await this.TerritorioRepository.findOne(id);
      if (!territorio)
        throw new NotFoundException(`Ese territorio no existe en BD`);
      return territorio;
    }
  
    async createTerritorio( dto: CreateTerritorioDto): Promise<TerritorioDTO> {
      const { nombre, descripcion } = dto;
  
      const territorioInDB = await this.TerritorioRepository.findOne({
        where: { nombre }
      });
  
      if (territorioInDB) {
        throw new HttpException(
          'Un territorio con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const territorio: Territorio = await this.TerritorioRepository.create({ nombre, descripcion },);
      await this.TerritorioRepository.save(territorio);
      return toTerritorioDto(territorio);
    }
  
    async editTerritorio(dto: CreateTerritorioDto, id: string) {
      const territorio = await this.TerritorioRepository.findOne(id);
      if (!territorio)
        throw new NotFoundException(`Ese territorio no existe en Base de Datos`);
  
      const territorioUpdated = Object.assign(territorio, dto);
      return await this.TerritorioRepository.save(territorioUpdated);
    }
  
    async deleteTerritorio(id: string) {
      return await this.TerritorioRepository.delete(id);
    }
  }
  