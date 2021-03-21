import { EntityRepository, Repository } from 'typeorm';
import { Deporte } from './deporte.entity';

@EntityRepository(Deporte)
export class DeporteRepository extends Repository<Deporte> {}
