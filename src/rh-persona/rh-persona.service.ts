import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Municipio } from '../rh-municipio/entities/rh-municipio.entity'
  import { MunicipioRepository} from '../rh-municipio/entities/municipio.repository'
  import { Persona } from './entities/rh-persona.entity';
import { PersonaDTO, CreatePersonaDto } from './dto/persona.dto';
import { toPersonaDto } from '../utils/mapper';

@Injectable()
export class RhPersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly PersonaRepository: Repository<Persona>
  ) {}

  async getAll( nombre?: string, ci?: string): Promise<Persona[]> {
    if (nombre) {
      return await this.PersonaRepository.find({ where: { nombre },
      });
    } else return await this.PersonaRepository.find();
  }

  async getbyId(id: string) {
    const persona = await this.PersonaRepository.findOne(id);
    if (!persona)
      throw new NotFoundException(`Esa persona no existe`);
    return persona;
  }

  async create( dto: CreatePersonaDto, file: Express.Multer.File): Promise<PersonaDTO> { 
    const { ci, nombre, primerApellido, segundoApellido, fechaNacimiento, telefCelular, telefFijo, email, direccion, sexo, activo,  municipioId } = dto;
    const municipioRepository: MunicipioRepository = await getConnection().getRepository(Municipio,);
    const mun = await municipioRepository.findOne(municipioId);
    if (!mun) {
      throw new HttpException(
        'No existe Municipio con ese ID para insertar en la direccion de la persona',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    const personaInDB = await this.PersonaRepository.findOne({
      where: { ci }
    });

    if (personaInDB) {
      throw new HttpException(
        'Una Persona con ese CI ya esta registrada en el sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foto = file.path;
    const persona: Persona = await this.PersonaRepository.create({ ci, nombre, primerApellido, segundoApellido, fechaNacimiento, telefCelular, telefFijo, email, direccion, sexo, activo, foto },);
    persona.municipio = mun;
    await this.PersonaRepository.save(persona);
    return toPersonaDto(persona);
  }

  async edit(dto: PersonaDTO, id: string) {
    const person = await this.PersonaRepository.findOne(id);
    if (!person)
      throw new NotFoundException(`Esa persona no existe en el sistema`);

    const personUpdated = Object.assign(person, dto);
    return await this.PersonaRepository.save(personUpdated);
  }

  async delete(id: string) {
    return await this.PersonaRepository.delete(id);
  }
}
