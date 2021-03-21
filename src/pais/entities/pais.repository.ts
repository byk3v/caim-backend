import { EntityRepository, Repository } from 'typeorm';
import { Pais } from './pais.entity';

@EntityRepository(Pais)
export class PaisRepository extends Repository<Pais> {}
