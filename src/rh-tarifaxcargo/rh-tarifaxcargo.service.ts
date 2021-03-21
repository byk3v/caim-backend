import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Cargo } from '../rh-cargo/entities/rh-cargo.entity'
  import { CargoRepository} from '../rh-cargo/entities/cargo.repository'
  import { TarifaCargo } from './entities/rh-tarifaxcargo.entity';
import { TarifaXCargoDTO, CreateTarifaXCargoDto } from './dto/tarifaxcargo.dto';
import { toTarifaCargoDto } from '../utils/mapper';

@Injectable()
export class RhTarifaxcargoService {
    constructor(
      @InjectRepository(TarifaCargo)
      private readonly TarifaCargoRepository: Repository<TarifaCargo>
    ) {}
  
    async getAll( tarifa?: string): Promise<TarifaCargo[]> {
      if (tarifa) {
        return await this.TarifaCargoRepository.find({ where: { tarifa },
        });
      } else return await this.TarifaCargoRepository.find();
    }
  
    async getbyId(id: string) {
      const tarifaxcargo = await this.TarifaCargoRepository.findOne(id);
      if (!tarifaxcargo)
        throw new NotFoundException(`Esa tarifa  x cargo no existe`);
      return tarifaxcargo;
    }
  
    async create( dto: CreateTarifaXCargoDto): Promise<TarifaXCargoDTO> { //, idMcargo: string
      const { tarifa, descripcion, cargoId } = dto;
      //console.log(tarifa, descripcion, cargoId);
      const cargoRepository: CargoRepository = await getConnection().getRepository(Cargo,);
      const cargo = await cargoRepository.findOne(cargoId);
      //console.log(cargo);
      if (!cargo) {
        throw new HttpException(
          'No existe Cargo con ese ID para insertar en la Tarifa',
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const tarifaInDB = await this.TarifaCargoRepository.findOne({
        where: { descripcion }
      });
  
      if (tarifaInDB) {
        throw new HttpException(
          'Una Tarifa para ese cargo ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const tarifaCar: TarifaCargo = await this.TarifaCargoRepository.create({ tarifa, descripcion },);
      tarifaCar.cargo = cargo;
      await this.TarifaCargoRepository.save(tarifaCar);
      return toTarifaCargoDto(tarifaCar);
    }
  
    async edit(dto: TarifaXCargoDTO, id: string) {
      const tarifa = await this.TarifaCargoRepository.findOne(id);
      if (!tarifa)
        throw new NotFoundException(`Esa Tarifa x Cargo no existe`);
  
      const tarifaUpdated = Object.assign(tarifa, dto);
      return await this.TarifaCargoRepository.save(tarifaUpdated);
    }
  
    async delete(id: string) {
      return await this.TarifaCargoRepository.delete(id);
    }
  }
  