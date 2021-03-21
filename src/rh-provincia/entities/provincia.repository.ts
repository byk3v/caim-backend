import { EntityRepository, Repository } from 'typeorm';
import { Provincia } from './rh-provincia.entity';

@EntityRepository(Provincia)
export class ProvinciaRepository extends Repository<Provincia> {}
