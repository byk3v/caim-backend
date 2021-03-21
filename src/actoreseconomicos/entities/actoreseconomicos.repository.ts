import { EntityRepository, Repository } from 'typeorm';
import { ActoresEconomicos } from './actoreseconomico.entity';

@EntityRepository(ActoresEconomicos)
export class ActoresEconomicosRepository extends Repository<ActoresEconomicos> {}
