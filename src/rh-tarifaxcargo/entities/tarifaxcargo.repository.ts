import { EntityRepository, Repository } from 'typeorm';
import { TarifaCargo } from './rh-tarifaxcargo.entity';

@EntityRepository(TarifaCargo)
export class TarifaCargoRepository extends Repository<TarifaCargo> {}
