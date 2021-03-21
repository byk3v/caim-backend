import { EntityRepository, Repository } from 'typeorm';
import { Persona } from './rh-persona.entity';

@EntityRepository(Persona)
export class PersonaRepository extends Repository<Persona> {}
