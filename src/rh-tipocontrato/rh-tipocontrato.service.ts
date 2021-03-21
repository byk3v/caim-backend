import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { TipoContrato } from './entities/rh-tipocontrato.entity'
import { TipoContratoDTO, CreateTipoContratoDto } from './dto/tipocontrato.dto';
import { toTipoContratoDto } from '../utils/mapper';

@Injectable()
export class RhTipocontratoService {
  constructor(
    @InjectRepository(TipoContrato)
    private readonly TipoContratoRepository: Repository<TipoContrato>
  ) {}

  async getTipoContratos( nombre?: string): Promise<TipoContrato[]> {
    if (nombre) {
      return await this.TipoContratoRepository.find({ where: { nombre },
      });
    } else return await this.TipoContratoRepository.find();
  }

  async getbyId(id: string) {
    const tipocontrato = await this.TipoContratoRepository.findOne(id);
    if (!tipocontrato)
      throw new NotFoundException(`Ese tipo de contrato no existe`);
    return tipocontrato;
  }

  async createTipoContrato( dto: CreateTipoContratoDto): Promise<TipoContratoDTO> {
    const { nombre, descripcion } = dto;

    const tcInDB = await this.TipoContratoRepository.findOne({
      where: { nombre }
    });

    if (tcInDB) {
      throw new HttpException(
        'Un tipo de contrato con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const tc: TipoContrato = await this.TipoContratoRepository.create({ nombre, descripcion },);
    await this.TipoContratoRepository.save(tc);
    return toTipoContratoDto(tc);
  }

  async editTipoContrato(dto: CreateTipoContratoDto, id: string) {
    const tc = await this.TipoContratoRepository.findOne(id);
    if (!tc)
      throw new NotFoundException(`Ese Tipo de COntrato no existe en Base de Datos`);

    const tipocontratoUpdated = Object.assign(tc, dto);
    return await this.TipoContratoRepository.save(tipocontratoUpdated);
  }

  async deleteTipoContrato(id: string) {
    return await this.TipoContratoRepository.delete(id);
  }
}
