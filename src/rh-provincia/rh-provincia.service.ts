import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Provincia } from './entities/rh-provincia.entity'
  import { CreateProvinciaDto, ProvinciaDTO } from './dto/provincia.dto';
  import { toProvinciaDto } from '../utils/mapper';

@Injectable()
export class RhProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly ProvinciaRepository: Repository<Provincia>
  ) {}

  async getAll( nombre?: string): Promise<Provincia[]> {
    if (nombre) {
      return await this.ProvinciaRepository.find({ where: { nombre },
      });
    } else return await this.ProvinciaRepository.find();
  }

  async getbyId(id: string) {
    const provincia = await this.ProvinciaRepository.findOne(id);
    if (!provincia)
      throw new NotFoundException(`Esa provincia no existe`);
    return provincia;
  }

  async create( dto: CreateProvinciaDto): Promise<ProvinciaDTO> {
    const { nombre} = dto;

    const provinciaInDB = await this.ProvinciaRepository.findOne({
      where: { nombre }
    });

    if (provinciaInDB) {
      throw new HttpException(
        'Una provincia con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const provincia: Provincia = await this.ProvinciaRepository.create({ nombre },);
    await this.ProvinciaRepository.save(provincia);
    return toProvinciaDto(provincia);
  }

  async edit(dto: CreateProvinciaDto, id: string) {
    const provincia = await this.ProvinciaRepository.findOne(id);
    if (!provincia)
      throw new NotFoundException(`Esa provincia no existe en Base de Datos`);

    const provinciaUpdated = Object.assign(provincia, dto);
    return await this.ProvinciaRepository.save(provinciaUpdated);
  }

  async delete(id: string) {
    return await this.ProvinciaRepository.delete(id);
  }
}
