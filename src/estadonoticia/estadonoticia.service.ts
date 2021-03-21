import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { EstadoNoticia } from './entities/estadonoticia.entity'
  import { CreateEstadoNoticiaDto, EstadoNoticiaDTO } from './dto/estadonoticia.dto';
  import { toEstadoNoticiaDto } from '../utils/mapper';
  
  @Injectable()
export class EstadonoticiaService {
    constructor(
      @InjectRepository(EstadoNoticia)
      private readonly EstadoNoticiaRepository: Repository<EstadoNoticia>
    ) {}
  
    async getEstados( nombre?: string): Promise<EstadoNoticia[]> {
      if (nombre) {
        return await this.EstadoNoticiaRepository.find({ where: { nombre },
        });
      } else return await this.EstadoNoticiaRepository.find();
    }
  
    async getbyId(id: string) {
      const estado = await this.EstadoNoticiaRepository.findOne(id);
      if (!estado)
        throw new NotFoundException(`Ese estado no existe`);
      return estado;
    }
  
    async createEstado( dto: CreateEstadoNoticiaDto): Promise<EstadoNoticiaDTO> {
      const { nombre, descripcion } = dto;
  
      const estadoInDB = await this.EstadoNoticiaRepository.findOne({
        where: { nombre }
      });
  
      if (estadoInDB) {
        throw new HttpException(
          'Un estado con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const estado: EstadoNoticia = await this.EstadoNoticiaRepository.create({ nombre, descripcion },);
      await this.EstadoNoticiaRepository.save(estado);
      return toEstadoNoticiaDto(estado);
    }
  
    async editEstado(dto: CreateEstadoNoticiaDto, id: string) {
      const estado = await this.EstadoNoticiaRepository.findOne(id);
      if (!estado)
        throw new NotFoundException(`Ese estado no existe en Base de Datos`);
  
      const estadoUpdated = Object.assign(estado, dto);
      return await this.EstadoNoticiaRepository.save(estadoUpdated);
    }
  
    async deleteEstado(id: string) {
      return await this.EstadoNoticiaRepository.delete(id);
    }
  }
  