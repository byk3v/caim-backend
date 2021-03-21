import { EntityRepository, Repository } from 'typeorm';
import { Territorio } from './territorio.entity';

@EntityRepository(Territorio)
export class TerritorioRepository extends Repository<Territorio> {}
