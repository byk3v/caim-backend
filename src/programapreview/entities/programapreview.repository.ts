import { EntityRepository, Repository } from 'typeorm';
import { Programapreview } from './programapreview.entity';

@EntityRepository(Programapreview)
export class ProgramapreviewRepository extends Repository<Programapreview> {}
