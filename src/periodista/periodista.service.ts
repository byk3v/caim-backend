import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Periodista } from './entities/periodista.entity'
  import { CreatePeriodistaDto, PeriodistaDto } from './dto/periodista.dto';
  import { toPeriodistaDto } from '../utils/mapper';
  
  @Injectable()
export class PeriodistaService {
    constructor(
      @InjectRepository(Periodista)
      private readonly PeriodistaRepository: Repository<Periodista>
    ) {}
  
    async getAll( nombre?: string): Promise<Periodista[]> {
      if (nombre) {
        return await this.PeriodistaRepository.find({ where: { nombre },
        });
      } else return await this.PeriodistaRepository.find();
    }
  
    async getbyId(id: string) {
      const perio = await this.PeriodistaRepository.findOne(id);
      if (!perio)
        throw new NotFoundException(`Ese periodista no existe en BD`);
      return perio;
    }
  
    async create( dto: CreatePeriodistaDto): Promise<PeriodistaDto> {
      const { nombre, descripcion } = dto;
  
      const perioInDB = await this.PeriodistaRepository.findOne({
        where: { nombre }
      });
  
      if (perioInDB) {
        throw new HttpException(
          'Un periodista con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const periodista: Periodista = await this.PeriodistaRepository.create({ nombre, descripcion },);
      await this.PeriodistaRepository.save(periodista);
      return toPeriodistaDto(periodista);
    }
  
    async edit(dto: CreatePeriodistaDto, id: string) {
      const journalist = await this.PeriodistaRepository.findOne(id);
      if (!journalist)
        throw new NotFoundException(`Ese periodista no existe en Base de Datos`);
  
      const journalistUpdated = Object.assign(journalist, dto);
      return await this.PeriodistaRepository.save(journalistUpdated);
    }
  
    async delete(id: string) {
      return await this.PeriodistaRepository.delete(id);
    }
  }
  