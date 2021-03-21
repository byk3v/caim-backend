import { EntityRepository, Repository } from 'typeorm';
import { Municipio } from './rh-municipio.entity';

@EntityRepository(Municipio)
export class MunicipioRepository extends Repository<Municipio> {}
