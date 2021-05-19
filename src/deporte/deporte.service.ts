import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Deporte } from './entities/deporte.entity'
  import { CreateDeporteDto, DeporteDTO } from './dto/deporte.dto';
  import { toDeporteDto } from '../utils/mapper';
  import { youtubeinfo} from 'updated-youtube-info'
  import getVideoId from 'get-video-id';
  
  @Injectable()
export class DeporteService {
    constructor(
      @InjectRepository(Deporte)
      private readonly DeporteRepository: Repository<Deporte>
    ) {}
  
    async getDeportes( nombre?: string): Promise<Deporte[]> {
      /*if (nombre) {
        return await this.DeporteRepository.find({ where: { nombre },
        });
      } else return await this.DeporteRepository.find();*/
      const depor = await getConnection().createQueryBuilder()
        .select("deporte")
        .from(Deporte, "deporte")
        .orderBy("deporte.nombre") 
        .getMany();
        if (!depor)
          throw new NotFoundException(`No encontramos deportes`);
        return depor;
    }
  
    async getbyId(id: string) {
      const deporte = await this.DeporteRepository.findOne(id);
      if (!deporte)
        throw new NotFoundException(`Ese deporte no existe`);
      return deporte;
    }
  
    async createDeporte( dto: CreateDeporteDto): Promise<DeporteDTO> {
      const { nombre, descripcion } = dto;
  
      const deporteInDB = await this.DeporteRepository.findOne({
        where: { nombre }
      });
  
      if (deporteInDB) {
        throw new HttpException(
          'Un deporte con ese nombre ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const deporte: Deporte = await this.DeporteRepository.create({ nombre, descripcion },);
      await this.DeporteRepository.save(deporte);
      return toDeporteDto(deporte);
    }

    async createMany( dto: []): Promise<DeporteDTO> {
      let ultimoinsertado :Deporte = await this.DeporteRepository.create({  },);
      let descripcion ="";
    for (let index = 0; index < dto.length; index++) {
      const nombre = dto[index];
      const deporte: Deporte = await this.DeporteRepository.create({ nombre, descripcion },);

      ultimoinsertado = Object.assign(deporte, dto);
      await this.DeporteRepository.save(deporte);  
    }
    
    return toDeporteDto(ultimoinsertado);
  }
  
    async editDeporte(dto: CreateDeporteDto, id: string) {
      const deporte = await this.DeporteRepository.findOne(id);
      if (!deporte)
        throw new NotFoundException(`Ese Deporte no existe en Base de Datos`);
  
      const deporteUpdated = Object.assign(deporte, dto);
      return await this.DeporteRepository.save(deporteUpdated);
    }
  
    async deleteDeporte(id: string) {
      return await this.DeporteRepository.delete(id);
    }

    //async 
    pruebaYoutube() {
      //return await this.DeporteRepository.delete(id);
  const urlit = "https://www.youtube.com/watch?v=8rSH8-pbHZ0";
  //const { id } = getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
 const varvideoid = "8rSH8-pbHZ0";

 const info = youtubeinfo(varvideoid);
 info.then(function(data){
   console.log(data)
 })
  console.log(varvideoid);
    }
  }
  