import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Categoria } from './entities/categoria.entity'
  import { CreateCategoriaDto, CategoriaDto } from './dto/categoria.dto';
  import { toCategoriaDto } from '../utils/mapper';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly CategoriaRepository: Repository<Categoria>
  ) {}

  async getCategorias( codigo?: string): Promise<Categoria[]> {
    /*if (codigo) {
      return await this.CategoriaRepository.find({ where: { codigo },
      });
    } else return await this.CategoriaRepository.find().orderBy(codigo);*/
    const categ = await getConnection().createQueryBuilder()
        .select("categoria")
        .from(Categoria, "categoria")
        .orderBy("categoria.codigo") 
        .getMany();
        if (!categ)
          throw new NotFoundException(`No encontramos categorias`);
          //console.log(categ);
        return categ;
  }

  async getbyId(id: string) {
    const categoria = await this.CategoriaRepository.findOne(id);
    if (!categoria)
      throw new NotFoundException(`Esa categoria no existe`);
    return categoria;
  }

  async createCategoria( dto: CreateCategoriaDto): Promise<CategoriaDto> {
    const { codigo, nombre, descripcion } = dto;

    const CategoriaInDB = await this.CategoriaRepository.findOne({
      where: { codigo }
    });

    if (CategoriaInDB) {
      throw new HttpException(
        'Una Categoria con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const Categoria: Categoria = await this.CategoriaRepository.create({ codigo, nombre, descripcion },);
    await this.CategoriaRepository.save(Categoria);
    return toCategoriaDto(Categoria);
  }

  async editCategoria(dto: CreateCategoriaDto, id: string) {
    const categoria = await this.CategoriaRepository.findOne(id);
    if (!categoria)
      throw new NotFoundException(`Esa categoria no existe en Base de Datos`);

    const categoriaUpdated = Object.assign(categoria, dto);
    return await this.CategoriaRepository.save(categoriaUpdated);
  }

  async deleteCategoria(id: string) {
    return await this.CategoriaRepository.delete(id);
  }
}
