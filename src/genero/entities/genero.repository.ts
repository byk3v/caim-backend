import { EntityRepository, Repository } from 'typeorm';
import { GeneroPeriodistico } from './genero.entity';

@EntityRepository(GeneroPeriodistico)
export class GeneroPeriodisticoRepository extends Repository<GeneroPeriodistico> {}
