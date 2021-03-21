import { EntityRepository, Repository } from 'typeorm';
import { Cargo } from './rh-cargo.entity';

@EntityRepository(Cargo)
export class CargoRepository extends Repository<Cargo> {}
