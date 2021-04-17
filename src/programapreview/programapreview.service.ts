import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
import { CreateProgramaPreviewDto, ProgramaPreviewDto } from './dto/programapreview.dto';
import {Programapreview } from './entities/programapreview.entity'
import { CanalRepository} from '../canal/entity/canal.repository'
import { Canal } from '../canal/entity/canal.entity'
import { Medio } from '../medio/entity/medios.entity'
import { toProgramaDto } from '../utils/mapper';

@Injectable()
export class ProgramapreviewService {
  constructor(
    @InjectRepository(Programapreview)
    private readonly ProgramapreviewRepository: Repository<Programapreview>
  ) {}

  async getAll( nombre?: string): Promise<Programapreview[]> {
    if (nombre) {
      return await this.ProgramapreviewRepository.find({ where: { nombre },
      });
    } else return await this.ProgramapreviewRepository.find();
  }

  async getbyId(id: string) {
    const programa = await this.ProgramapreviewRepository.findOne(id);
    if (!programa)
      throw new NotFoundException(`Ese programa no existe en BD`);
    return programa;
  }

  async findProgramByMedio(medioId: string): Promise<Programapreview[]> {  
    return await getConnection()
      .getRepository(Programapreview)
      .createQueryBuilder('Programapreview')
      .addSelect('Programapreview.id, Programapreview.nombre')
      .innerJoin('Canal', 'Programapreview.canalId = Canal.id')
      .innerJoin('Medio', 'Canal.medioId = Medio.id')
      .where('Medio.id = :medioId', { medioId })
      //.orderBy("user.name")
      .getMany();
  }

  async create( dto: CreateProgramaPreviewDto): Promise<ProgramaPreviewDto> {
    const { nombre, descripcion, logo, canalId } = dto;
    const canalRepository: CanalRepository = await getConnection().getRepository(Canal,);
    const canaleta = await canalRepository.findOne(canalId);
    if (!canaleta) {
      throw new HttpException(
        'No existe Canal con ese ID para insertar en el programa',
        HttpStatus.BAD_REQUEST,
      );
    }

    const programaInDB = await this.ProgramapreviewRepository.findOne({
      where: { nombre }
    });

    if (programaInDB) {
      throw new HttpException(
        'Un Preview de programa con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const pPreview: Programapreview = await this.ProgramapreviewRepository.create({ nombre, descripcion, logo },);
    pPreview.canal= canaleta;
    await this.ProgramapreviewRepository.save(pPreview);
    return toProgramaDto(pPreview);
  }

  async edit(dto: CreateProgramaPreviewDto, id: string) {
    const program = await this.ProgramapreviewRepository.findOne(id);
    if (!program)
      throw new NotFoundException(`Ese programa no existe en Base de Datos`);

    const programUpdated = Object.assign(program, dto);
    return await this.ProgramapreviewRepository.save(programUpdated);
  }

  async delete(id: string) {
    return await this.ProgramapreviewRepository.delete(id);
  }
}
