import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Canal } from './entity/canal.entity';
  import { Medio } from '../medio/entity/medios.entity'
  import { CreateCanalDto, CanalDTO } from './entity/canal.dto';
  import { toCanalDto } from '../utils/mapper';
  import { MedioRepository} from '../medio/entity/medio.repository'
  
  @Injectable()
export class CanalService {
    constructor(
      @InjectRepository(Canal)
      private readonly CanalRepository: Repository<Canal>
    ) {}
  
    async getCanal( nombre?: string): Promise<Canal[]> {
      if (nombre) {
        return await this.CanalRepository.find({ where: { nombre },
        });
      } else return await this.CanalRepository.find();
    }
  
    async getbyId(id: string) {
      const canal = await this.CanalRepository.findOne(id);
      if (!canal)
        throw new NotFoundException(`Ese Canal no existe`);
      return canal;
    }
  
    async createCanal( dto: CreateCanalDto): Promise<CanalDTO> { //, idMedio: string
      const { nombre, logo, medioId } = dto;
      const medioRepository: MedioRepository = await getConnection().getRepository(Medio,);
      const medio = await medioRepository.findOne(medioId);
      if (!medio) {
        throw new HttpException(
          'No existe Medio con ese ID para insertar el canal',
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const canalInDB = await this.CanalRepository.findOne({
        where: { nombre }
      });
  
      if (canalInDB) {
        throw new HttpException(
          'Un canal con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const canal: Canal = await this.CanalRepository.create({ nombre, logo },);
      canal.medio = medio;
      await this.CanalRepository.save(canal);
      //return canal;
      return toCanalDto(canal);
    }
  
    async editCanal(dto: CanalDTO, id: string) {
      const canal = await this.CanalRepository.findOne(id);
      if (!canal)
        throw new NotFoundException(`Ese Canal no existe`);
  
      const canalUpdated = Object.assign(canal, dto);
      return await this.CanalRepository.save(canalUpdated);
    }
  
    async deleteCanal(id: string) {
      return await this.CanalRepository.delete(id);
    }
  }
  