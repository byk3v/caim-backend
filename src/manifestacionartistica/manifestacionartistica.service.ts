import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { ManifestacionArtistica } from './entities/manifestacionartistica.entity'
  import { CreateManifestacionArtisticaDto, ManifestacionArtisticaDTO } from './dto/manifestacionartistica.dto';
  import { toManifestacionArtisticaDto } from '../utils/mapper';

@Injectable()
export class ManifestacionartisticaService {
  constructor(
    @InjectRepository(ManifestacionArtistica)
    private readonly ManifestacionArtisticaRepository: Repository<ManifestacionArtistica>
  ) {}

  async getManifestacionArtistica( nombre?: string): Promise<ManifestacionArtistica[]> {
    if (nombre) {
      return await this.ManifestacionArtisticaRepository.find({ where: { nombre },
      });
    } else return await this.ManifestacionArtisticaRepository.find();
  }

  async getbyId(id: string) {
    const manifartistica = await this.ManifestacionArtisticaRepository.findOne(id);
    if (!manifartistica)
      throw new NotFoundException(`Esa manifestacion artistica no existe`);
    return manifartistica;
  }

  async createManifestacion( dto: CreateManifestacionArtisticaDto): Promise<ManifestacionArtisticaDTO> {
    const { nombre, descripcion } = dto;

    const manifestacionInDB = await this.ManifestacionArtisticaRepository.findOne({
      where: { nombre }
    });

    if (manifestacionInDB) {
      throw new HttpException(
        'Una manifestacion con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const manifestacion: ManifestacionArtistica = await this.ManifestacionArtisticaRepository.create({ nombre, descripcion },);
    await this.ManifestacionArtisticaRepository.save(manifestacion);
    return toManifestacionArtisticaDto(manifestacion);
  }

  async editManifestacion(dto: CreateManifestacionArtisticaDto, id: string) {
    const manifestacion = await this.ManifestacionArtisticaRepository.findOne(id);
    if (!manifestacion)
      throw new NotFoundException(`Esa manifestacion no existe en Base de Datos`);

    const manifestacionUpdated = Object.assign(manifestacion, dto);
    return await this.ManifestacionArtisticaRepository.save(manifestacionUpdated);
  }

  async deleteManifestacion(id: string) {
    return await this.ManifestacionArtisticaRepository.delete(id);
  }
}
