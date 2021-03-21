import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Cargo } from './entities/rh-cargo.entity'
  import { CreateCargoDto, CargoDTO } from './dto/cargo.dto';
  import { tocargoDto } from '../utils/mapper';

@Injectable()
export class RhCargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly CargoRepository: Repository<Cargo>
  ) {}

  async getAll( nombre?: string): Promise<Cargo[]> {
    if (nombre) {
      return await this.CargoRepository.find({ where: { nombre },
      });
    } else return await this.CargoRepository.find();
  }

  async getbyId(id: string) {
    const cargo = await this.CargoRepository.findOne(id);
    if (!cargo)
      throw new NotFoundException(`Ese Cargo no existe`);
    return cargo;
  }

  async create( dto: CreateCargoDto): Promise<CargoDTO> {
    const { nombre, descripcion } = dto;

    const cargoInDB = await this.CargoRepository.findOne({
      where: { nombre }
    });

    if (cargoInDB) {
      throw new HttpException(
        'Un cargo con ese nombre ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    const cargo: Cargo = await this.CargoRepository.create({ nombre, descripcion },);
    await this.CargoRepository.save(cargo);
    return tocargoDto(cargo);
  }

  async edit(dto: CreateCargoDto, id: string) {
    const cargo = await this.CargoRepository.findOne(id);
    if (!cargo)
      throw new NotFoundException(`Ese cargo no existe en Base de Datos`);

    const cargoUpdated = Object.assign(cargo, dto);
    return await this.CargoRepository.save(cargoUpdated);
  }

  async delete(id: string) {
    return await this.CargoRepository.delete(id);
  }
}
