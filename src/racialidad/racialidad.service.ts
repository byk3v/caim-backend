import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
import { CreateRacialidadDto, RacialidadDto } from './dto/racialidad.dto';
import {Racialidad } from './entities/racialidad.entity'
import { toRacialidadDto } from '../utils/mapper';

@Injectable()
export class RacialidadService {
  constructor(
    @InjectRepository(Racialidad)
    private readonly RacialidadRepository: Repository<Racialidad>
  ) {}

  async getAll( ): Promise<Racialidad[]> {
    return await this.RacialidadRepository.find();
  }

  async getbyId(id: string) {
    const racialidad = await this.RacialidadRepository.findOne(id);
    if (!racialidad)
      throw new NotFoundException(`Eso no existe en BD`);
    return racialidad;
  }

  async create( dto: CreateRacialidadDto): Promise<RacialidadDto> {
    const { whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest } = dto;
    
    /*const racialidadInDB = await this.RacialidadRepository.findOne({
      where: { nombre }
    });

    if (paisInDB) {
      throw new HttpException(
        'Un pais con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }*/

    const racialidad: Racialidad = await this.RacialidadRepository.create({ whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest },);
    await this.RacialidadRepository.save(racialidad);
    return toRacialidadDto(racialidad);
  }

  async edit(dto: CreateRacialidadDto, id: string) {
    const raza = await this.RacialidadRepository.findOne(id);
    if (!raza)
      throw new NotFoundException(`Ese  no existe en Base de Datos`);

    const razaUpdated = Object.assign(raza, dto);
    return await this.RacialidadRepository.save(razaUpdated);
  }

  async delete(id: string) {
    return await this.RacialidadRepository.delete(id);
  }
}
