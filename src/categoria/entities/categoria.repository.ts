import { EntityRepository, Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {}
