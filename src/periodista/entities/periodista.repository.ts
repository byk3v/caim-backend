import { EntityRepository, Repository } from 'typeorm';
import { Periodista } from './periodista.entity';

@EntityRepository(Periodista)
export class PeriodistaRepository extends Repository<Periodista> {}
