import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Medio } from './entity/medios.entity';
  import { CreateMedioDto, MedioDTO } from './entity/medio.dto';
  import { toMedioDto } from '../utils/mapper';
  
  @Injectable()
export class MedioService {
    constructor(
      @InjectRepository(Medio)
      private readonly MedioRepository: Repository<Medio>,
    ) {}
  
    async getMedio( nombre?: string): Promise<Medio[]> {
      if (nombre) {
        return await this.MedioRepository.find({ where: { nombre },
        });
      } else return await this.MedioRepository.find();
    }
  
    async getbyId(id: string) {
      const medio = await this.MedioRepository.findOne(id);
      if (!medio)
        throw new NotFoundException(`Ese Medio no existe`);
      return medio;
    }
  
    async createMedio( dto: CreateMedioDto): Promise<MedioDTO> {
      const { nombre, logo } = dto;
  
      const medioInDB = await this.MedioRepository.findOne({
        where: { nombre }
      });
  
      if (medioInDB) {
        throw new HttpException(
          'Un medio con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
  //console.log(logo);
      const medio: Medio = await this.MedioRepository.create({ nombre, logo },);
      await this.MedioRepository.save(medio);
      return toMedioDto(medio);
    }
  
    async editMedio(dto: MedioDTO, id: string) {
      const medio = await this.MedioRepository.findOne(id);
      if (!medio)
        throw new NotFoundException(`Ese Medio no existe`);
  
      const medioUpdated = Object.assign(medio, dto);
      return await this.MedioRepository.save(medioUpdated);
    }
  
    async deleteMedio(id: string) {
      return await this.MedioRepository.delete(id);
    }
  }
  