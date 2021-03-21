import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Cargo } from '../rh-cargo/entities/rh-cargo.entity'
  import { CargoRepository } from '../rh-cargo/entities/cargo.repository'
  import { Persona } from '../rh-persona/entities/rh-persona.entity'
  import { PersonaRepository } from '../rh-persona/entities/persona.repository'
  import { TipoContratoRepository} from '../rh-tipocontrato/entities/tipocontrato.repository'
  import { TipoContrato} from '../rh-tipocontrato/entities/rh-tipocontrato.entity'
  import { Contrato } from './entities/rh-contrato.entity';
import { ContratoDTO, CreateContratoDTO } from './dto/contrato.dto';
import { toContratoDto } from '../utils/mapper';

@Injectable()
export class RhContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly ContratoRepository: Repository<Contrato>
  ) {}

  async getAll( ): Promise<Contrato[]> {
     return await this.ContratoRepository.find();
  }

  async getbyId(id: string) {
    const contrato = await this.ContratoRepository.findOne(id);
    if (!contrato)
      throw new NotFoundException(`Contrato con ese id no fue encontrado`);
    return contrato;
  }

  async create( dto: CreateContratoDTO): Promise<ContratoDTO> { 
    const { duracion, activo, personaId, cargoId, tipoContratoId } = dto;
    const personaRepository: PersonaRepository = await getConnection().getRepository(Persona,);
    const CargoRepository: CargoRepository = await getConnection().getRepository(Cargo,);
    const TipoContratoRepository: TipoContratoRepository = await getConnection().getRepository(TipoContrato,);
    const person = await personaRepository.findOne(personaId);
    const cargo = await CargoRepository.findOne(cargoId);
    const contractType = await TipoContratoRepository.findOne(tipoContratoId);

    if (!person) {
      throw new HttpException(
        'No existe la Persona con el ID que estás pasando para el contrato',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!cargo) {
      throw new HttpException(
        'No existe el Cargo con el ID que estás pasando para el contrato',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!contractType) {
      throw new HttpException(
        'No existe el Tipo de COntrato con el ID que estás pasando para el contrato',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    /*const municipioInDB = await this.ContratoRepository.findOne({           //Aqui alguna validacion para crear contrato, que no se repitan cargo y persona al mismo tiempo o algo asi
      where: { nombre }
    });

    if (municipioInDB) {
      throw new HttpException(
        'Un Municipio con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }*/

    const contrato: Contrato = await this.ContratoRepository.create({ duracion, activo },);
    contrato.cargo = cargo;
    contrato.persona = person;
    contrato.tipocontrato = contractType;
    await this.ContratoRepository.save(contrato);
    return toContratoDto(contrato);
  }

  async edit(dto: ContratoDTO, id: string) {
    const contrato = await this.ContratoRepository.findOne(id);
    if (!contrato)
      throw new NotFoundException(`Ese contrato  no existe`);

    const contratoUpdated = Object.assign(contrato, dto);
    return await this.ContratoRepository.save(contratoUpdated);
  }

  async delete(id: string) {
    return await this.ContratoRepository.delete(id);
  }
}
