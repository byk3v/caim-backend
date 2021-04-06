import { EntityRepository, Repository } from 'typeorm';
import { Racialidad } from './racialidad.entity';

@EntityRepository(Racialidad)
export class RacialidadRepository extends Repository<Racialidad> {}
