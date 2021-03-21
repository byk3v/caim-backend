import { EntityRepository, Repository } from 'typeorm';
import { TipoContrato } from './rh-tipocontrato.entity';

@EntityRepository(TipoContrato)
export class TipoContratoRepository extends Repository<TipoContrato> {}
