import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Provincia } from '../rh-provincia/entities/rh-provincia.entity'
  import { ProvinciaRepository} from '../rh-provincia/entities/provincia.repository'
  import { Municipio } from './entities/rh-municipio.entity';
import { MunicipioDTO, CreateMunicipioDto } from './dto/municipio.dto';
import { toMunicipioDto } from '../utils/mapper';

@Injectable()
export class RhMunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private readonly MunicipioRepository: Repository<Municipio>
  ) {}

  async getAll( nombre?: string): Promise<Municipio[]> {
    if (nombre) {
      return await this.MunicipioRepository.find({ where: { nombre },
      });
    } else return await this.MunicipioRepository.find();
  }

  async getbyId(id: string) {
    const municipio = await this.MunicipioRepository.findOne(id);
    if (!municipio)
      throw new NotFoundException(`Ese Municipio no existe`);
    return municipio;
  }

  async create( dto: CreateMunicipioDto): Promise<MunicipioDTO> { 
    const { nombre, descripcion, provinciaId } = dto;
    const provinciaRepository: ProvinciaRepository = await getConnection().getRepository(Provincia,);
    const prov = await provinciaRepository.findOne(provinciaId);
    if (!prov) {
      throw new HttpException(
        'No existe Provincia con ese ID para insertar en el Municipio',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const municipioInDB = await this.MunicipioRepository.findOne({
      where: { nombre }
    });

    if (municipioInDB) {
      throw new HttpException(
        'Un Municipio con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const municipio: Municipio = await this.MunicipioRepository.create({ nombre, descripcion },);
    municipio.provincia = prov;
    await this.MunicipioRepository.save(municipio);
    return toMunicipioDto(municipio);
  }

  async edit(dto: MunicipioDTO, id: string) {
    const municipio = await this.MunicipioRepository.findOne(id);
    if (!municipio)
      throw new NotFoundException(`Ese municipio  no existe`);

    const municipioUpdated = Object.assign(municipio, dto);
    return await this.MunicipioRepository.save(municipioUpdated);
  }

  async delete(id: string) {
    return await this.MunicipioRepository.delete(id);
  }
}
