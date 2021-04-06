import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm'; 
  import { User } from '../user/entities/user.entity'
  import { UserRepository} from '../user/entities/user.repository';
  import { Role } from '../role/entities/role.entity';
  import { RoleRepository} from '../role/entities/role.repository'
  import { Indicacion} from './entities/indicaciones.entity'
import { IndicacionesDto, CreateIndicacionesDto } from './dto/indicaciones.dto';
import { toIndicacionDto } from '../utils/mapper';

@Injectable()
export class IndicacionesService {
    constructor(
        @InjectRepository(Indicacion)
        private readonly IndicacionRepository: Repository<Indicacion>
      ) {}
    
      async getAll( ): Promise<Indicacion[]> {
         return await this.IndicacionRepository.find();
      }
    
      async getbyId(id: string) {
        const indi = await this.IndicacionRepository.findOne(id);
        if (!indi)
          throw new NotFoundException(`indicacion con ese id no fue encontrado`);
        return indi;
      }
    
      async create( dto: CreateIndicacionesDto): Promise<IndicacionesDto> { 
        const { texto, activa, emisorId, receptorId, rolId } = dto;

        const UserRepository: UserRepository = await getConnection().getRepository(User,);
        const emisor = await UserRepository.findOne(emisorId);
        const receptor = await UserRepository.findOne(receptorId);
        const RoleRepository: RoleRepository = await getConnection().getRepository(Role,);
        const rol = await RoleRepository.findOne(rolId);
        
        const indicacion: Indicacion = await this.IndicacionRepository.create({ texto, activa },);
        
        indicacion.emisor = emisor;
        indicacion.receptor = receptor;
        indicacion.rol = rol;

        await this.IndicacionRepository.save(indicacion);
        return toIndicacionDto(indicacion);
      }
    
      async edit(dto: IndicacionesDto, id: string) {
        const indi = await this.IndicacionRepository.findOne(id);
        if (!indi)
          throw new NotFoundException(`Esa noticia  no existe`);
    
        const indiUpdated = Object.assign(indi, dto);
        return await this.IndicacionRepository.save(indiUpdated);
      }
    
      async delete(id: string) {
        return await this.IndicacionRepository.delete(id);
      }
    }
    
