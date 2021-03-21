import { EntityRepository, Repository } from 'typeorm';
import { PoliticaInformativa } from './politicainformativa.entity';

@EntityRepository(PoliticaInformativa)
export class PoliticaInformativaRepository extends Repository<PoliticaInformativa> {}
