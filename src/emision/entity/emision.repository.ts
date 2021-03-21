import { EntityRepository, Repository } from 'typeorm';
import { Emision } from './emision.entity';

@EntityRepository(Emision)
export class EmisionRepository extends Repository<Emision> {}
