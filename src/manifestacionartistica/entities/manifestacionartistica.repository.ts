import { EntityRepository, Repository } from 'typeorm';
import { ManifestacionArtistica } from './manifestacionartistica.entity';

@EntityRepository(ManifestacionArtistica)
export class ManifestacionArtisticaRepository extends Repository<ManifestacionArtistica> {}
