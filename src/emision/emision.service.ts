import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Emision } from './entity/emision.entity';
  import { Canal } from '../canal/entity/canal.entity'
  import { Programapreview} from '../programapreview/entities/programapreview.entity'
  import { CreateEmisionDto, EmisionDTO } from './entity/emision.dto';
  import { toEmisionDto } from '../utils/mapper';
  import { CanalRepository} from '../canal/entity/canal.repository'
  import { ProgramapreviewRepository} from '../programapreview/entities/programapreview.repository'

@Injectable()
export class EmisionService {
    constructor(
        @InjectRepository(Emision)
        private readonly EmisionRepository: Repository<Emision>
      ) {}
    
      async getEmision( nombre?: string): Promise<Emision[]> {
        if (nombre) {
          return await this.EmisionRepository.find({ where: { nombre },
          });
        } else return await this.EmisionRepository.find();
      }
    
      async getbyId(id: string): Promise<Emision> {
        const emision = await this.EmisionRepository.findOne(id);
        if (!emision)
          throw new NotFoundException(`Esa Emision/Programa no existe`);
        return emision;
      }
    
      async createEmision( dto: CreateEmisionDto): Promise<EmisionDTO> { 
        const { nombre, canalId, programpreviewId } = dto;
        const canalRepository: CanalRepository = await getConnection().getRepository(Canal,);
        const programaRepository: ProgramapreviewRepository = await getConnection().getRepository(Programapreview);
        const canaleta = await canalRepository.findOne(canalId);
        const programa = await programaRepository.findOne(programpreviewId);
        if (!canaleta) {
          throw new HttpException(
            'No existe Canal con ese ID para insertar en la emision',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (!programa) {
          throw new HttpException(
            'No existe Programa con ese ID para insertar en esta emisión',
            HttpStatus.BAD_REQUEST,
          );
        }
        
        const emisionInDB = await this.EmisionRepository.findOne({
          where: { nombre }
        });
    
        if (emisionInDB) {
          throw new HttpException(
            'Un Programa/Emision con ese nombre ya existe',
            HttpStatus.BAD_REQUEST,
          );
        }
    
        const emision: Emision = await this.EmisionRepository.create({ nombre },);
        emision.canal = canaleta;
        emision.programa = programa;
        await this.EmisionRepository.save(emision);
        return toEmisionDto(emision);
      }
    
      async editEmision(dto: EmisionDTO, id: string) {
        const emision = await this.EmisionRepository.findOne(id);
        if (!emision)
          throw new NotFoundException(`Ese Programa/Emision no existe`);
    
        const emisionUpdated = Object.assign(emision, dto);
        return await this.EmisionRepository.save(emisionUpdated);
      }
    
      async deleteEmision(id: string) {
        return await this.EmisionRepository.delete(id);
      }
    }
    