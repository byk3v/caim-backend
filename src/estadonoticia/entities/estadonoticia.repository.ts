import { EntityRepository, Repository } from 'typeorm';
import { EstadoNoticia } from './estadonoticia.entity';

@EntityRepository(EstadoNoticia)
export class EstadoNoticiaRepository extends Repository<EstadoNoticia> {}
