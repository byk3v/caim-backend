import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Pais } from './entities/pais.entity'
  import { CreatePaisDto, PaisDTO } from './dto/pais.dto';
  import { toPaisDto } from '../utils/mapper';
  
  @Injectable()
export class PaisService {
    constructor(
      @InjectRepository(Pais)
      private readonly PaisRepository: Repository<Pais>
    ) {}
  
    async getPais( nombre?: string): Promise<Pais[]> {
      if (nombre) {
        return await this.PaisRepository.find({ where: { nombre },
        });
      } else return await this.PaisRepository.find();
    }
  
    async getbyId(id: string) {
      const pais = await this.PaisRepository.findOne(id);
      if (!pais)
        throw new NotFoundException(`Ese pais no existe`);
      return pais;
    }
  
    async createPais( dto: CreatePaisDto): Promise<PaisDTO> {
      const { nombre, descripcion } = dto;
  
      const paisInDB = await this.PaisRepository.findOne({
        where: { nombre }
      });
  
      if (paisInDB) {
        throw new HttpException(
          'Un pais con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const pais: Pais = await this.PaisRepository.create({ nombre, descripcion },);
      await this.PaisRepository.save(pais);
      return toPaisDto(pais);
    }
  
    async editPais(dto: CreatePaisDto, id: string) {
      const pais = await this.PaisRepository.findOne(id);
      if (!pais)
        throw new NotFoundException(`Ese pais no existe en Base de Datos`);
  
      const paisUpdated = Object.assign(pais, dto);
      return await this.PaisRepository.save(paisUpdated);
    }
  
    async deletePais(id: string) {
      return await this.PaisRepository.delete(id);
    }
  }
  