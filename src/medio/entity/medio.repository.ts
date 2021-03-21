import { EntityRepository, Repository } from 'typeorm';
import { Medio } from './medios.entity';

@EntityRepository(Medio)
export class MedioRepository extends Repository<Medio> {}
