import { EntityRepository, Repository } from 'typeorm';
import { Canal } from './canal.entity';

@EntityRepository(Canal)
export class CanalRepository extends Repository<Canal> {}
