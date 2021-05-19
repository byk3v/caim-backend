import { HttpException, HttpStatus, Injectable, NotFoundException,} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, getConnection } from 'typeorm';
  import { Emision } from '../emision/entity/emision.entity'
  import { EmisionRepository } from '../emision/entity/emision.repository'
  import { GeneroPeriodistico } from '../genero/entities/genero.entity'
  import { GeneroPeriodisticoRepository } from '../genero/entities/genero.repository'
  import { Categoria } from '../categoria/entities/categoria.entity'
  import { CategoriaRepository} from '../categoria/entities/categoria.repository'
  import { PoliticaInformativa} from '../politicainformativa/entities/politicainformativa.entity'
  import { PoliticaInformativaRepository} from '../politicainformativa/entities/politicainformativa.repository'
  import { ActoresEconomicos } from '../actoreseconomicos/entities/actoreseconomico.entity'
  import { ActoresEconomicosRepository } from '../actoreseconomicos/entities/actoreseconomicos.repository'
  import { EstadoNoticia } from '../estadonoticia/entities/estadonoticia.entity'
  import { EstadoNoticiaRepository } from '../estadonoticia/entities/estadonoticia.repository'
  import { User } from '../user/entities/user.entity'
  import { UserRepository} from '../user/entities/user.repository'
  import { Territorio} from '../territorio/entities/territorio.entity'
  import { TerritorioRepository} from '../territorio/entities/territorio.repository'
  import { Pais} from '../pais/entities/pais.entity'
  import { PaisRepository} from '../pais/entities/pais.repository'
  import { Deporte} from '../deporte/entities/deporte.entity'
  import { DeporteRepository} from '../deporte/entities/deporte.repository'
  import { ManifestacionArtistica} from '../manifestacionartistica/entities/manifestacionartistica.entity'
  import { ManifestacionArtisticaRepository} from '../manifestacionartistica/entities/manifestacionartistica.repository'
  import { Periodista} from '../periodista/entities/periodista.entity'
  import { PeriodistaRepository} from '../periodista/entities/periodista.repository'
  import { Noticia } from './entity/noticia.entity';
import { NoticiaDTO, CreateNoticiaDTO } from './entity/noticia.dto';
import { toNoticiaDto } from '../utils/mapper';
import { Racialidad } from 'src/racialidad/entities/racialidad.entity';
import { RacialidadRepository } from 'src/racialidad/entities/racialidad.repository';
import { RacialidadDto } from 'src/racialidad/dto/racialidad.dto';

@Injectable()
export class NoticiaService {
    constructor(
        @InjectRepository(Noticia)
        private readonly NoticiaRepository: Repository<Noticia>
      ) {}
    
      async getAll( ): Promise<Noticia[]> {
         return await this.NoticiaRepository.find();
      }
    
      async getbyId(id: string) {
        const noticia = await this.NoticiaRepository.findOne(id);
        if (!noticia)
          throw new NotFoundException(`noticia con ese id no fue encontrado`);
        return noticia;
      }

      async findNewsbyUser(userId: string): Promise<Noticia[]> {  // Aqui tratar de devolver un NoticiaDTO[], pero faltan atribs en la entity
        // return await this.Noticiaepository.find({
        //   relations: ['users'],
        //   where: { users: userId },
        // });
        console.log('userId', userId);
        return await getConnection()
          .getRepository(Noticia)
          .createQueryBuilder('noticia')
          .select('noticia')
          .leftJoin('noticia.usuario', 'usuario')
          .where('usuario.id = :userId', { userId })
          .orderBy("noticia.createdAt", "ASC")
          .getMany();
      }

      async findNewsbyState(stateId: string): Promise<Noticia[]> {  // Aqui tratar de devolver un NoticiaDTO[], pero faltan atribs en la entity
        return await getConnection()
          .getRepository(Noticia)
          .createQueryBuilder('noticia')
          .select('noticia')
          .leftJoin('noticia.estado', 'estado')
          .where('estado.id = :stateId', { stateId })
          .getMany();
      }
    
      async create( dto: CreateNoticiaDTO): Promise<NoticiaDTO> { 
        const { ideaCentral, incidencias, tareaOrdenamiento, entrevistados, imagen, enlace, compartidas, comentarios, interacciones, total, emisionId, generoPeriodisticoId, periodistas, categoriaPrincipalId, tags, politicaInformativaId, actoresEconomicosId, usuarioId, estadoId, territorioId, paisId, whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest, deporteId, manifestacionArtisticaId } = dto;
        //console.log(ideaCentral, incidencias, tareaOrdenamiento, periodista, entrevistados, imagen, enlace, compartidas, comentarios, interacciones, total, emisionId, generoPeriodisticoId, categoriaPrincipalId, politicaInformativaId, actoresEconomicosId, usuarioId, estadoId, territorioId, paisId, deporteId, manifestacionArtisticaId );

        const EmisionRepository: EmisionRepository = await getConnection().getRepository(Emision,);
        const emision = await EmisionRepository.findOne(emisionId);
        const GeneroPeriodisticoRepository: GeneroPeriodisticoRepository = await getConnection().getRepository(GeneroPeriodistico,);
        const genero = await GeneroPeriodisticoRepository.findOne(generoPeriodisticoId);
        const RacialidadRepository: RacialidadRepository = await getConnection().getRepository(Racialidad,);
        //const racialidad = await RacialidadRepository.findOne(racialidadId);
        const PoliticaInformativaRepository: PoliticaInformativaRepository = await getConnection().getRepository(PoliticaInformativa,);
        const politicainformativa = await PoliticaInformativaRepository.findOne(politicaInformativaId);
        const CategoriaRepository: CategoriaRepository = await getConnection().getRepository(Categoria,);
        const categoria = await CategoriaRepository.findOne(categoriaPrincipalId);
        const PeriodistaRepository: PeriodistaRepository = await getConnection().getRepository(Periodista,);
        //const periodista = await PeriodistaRepository.findOne(categoriaPrincipalId);
        const ActoresEconomicosRepository: ActoresEconomicosRepository = await getConnection().getRepository(ActoresEconomicos,);
        const actoreseconomico = await ActoresEconomicosRepository.findOne(actoresEconomicosId);
        const UserRepository: UserRepository = await getConnection().getRepository(User,);
        const usuario = await UserRepository.findOne(usuarioId);
        const EstadoNoticiaRepository: EstadoNoticiaRepository = await getConnection().getRepository(EstadoNoticia,);
        const estadonoticia = await EstadoNoticiaRepository.findOne(estadoId);
        const TerritorioRepository: TerritorioRepository = await getConnection().getRepository(Territorio,);
        const territorio = await TerritorioRepository.findOne(territorioId);
        const PaisRepository: PaisRepository = await getConnection().getRepository(Pais,);
        const pais = await PaisRepository.findOne(paisId);
        const DeporteRepository: DeporteRepository = await getConnection().getRepository(Deporte,);
        const deporte = await DeporteRepository.findOne(deporteId);
        const ManifestacionArtisticaRepository: ManifestacionArtisticaRepository = await getConnection().getRepository(ManifestacionArtistica,);
        const manifestacionartistica = await ManifestacionArtisticaRepository.findOne(manifestacionArtisticaId);

/*
        if (!emision) {
          throw new HttpException(
            'No existe la EMision con el ID que estás pasando para la noticia',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (!genero) {
          throw new HttpException(
            'No existe el Genero con el ID que estás pasando para la noticia',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (!politicainformativa) {
          throw new HttpException(
            'No existe la Politica Informativa con el ID que estás pasando para la noticia',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (!categoria) {
            throw new HttpException(
              'No existe la categoria con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!actoreseconomico) {
            throw new HttpException(
              'No existe el actor economico con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!usuario) {
            throw new HttpException(
              'No existe el usuario con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!estadonoticia) {
            throw new HttpException(
              'No existe el estado Noticia con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!territorio) {
            throw new HttpException(
              'No existe el territorio con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!pais) {
            throw new HttpException(
              'No existe el pais con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!deporte) {
            throw new HttpException(
              'No existe el deporte con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!manifestacionartistica) {
            throw new HttpException(
              'No existe Manifestacion Artitica con el ID que estás pasando para la noticia',
              HttpStatus.BAD_REQUEST,
            );
          }
  */        
        
        //Aqui alguna validacion para crear la noticia, pensar prohibiciones

        const medio = emision;
        console.log(medio);
        const raza: Racialidad = await RacialidadRepository.create({whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest});
        await RacialidadRepository.save(raza);
    
        const noticia: Noticia = await this.NoticiaRepository.create({ ideaCentral, incidencias, tareaOrdenamiento, entrevistados, imagen, enlace, compartidas, comentarios, interacciones, total },);
        
        if (tags.length > 0) {
            noticia.tags = await CategoriaRepository.findByIds(tags);
          }

          if (periodistas.length > 0) {
            noticia.periodistas = await PeriodistaRepository.findByIds(periodistas);
          }
        
        noticia.emision = emision;
        noticia.generoPeriodistico = genero;
        noticia.categoriaPrincipal = categoria;
        noticia.politicaInformativa = politicainformativa;
        noticia.actoresEconomicos = actoreseconomico;
        noticia.usuario = usuario;
        noticia.estado = estadonoticia;
        noticia.territorio = territorio;
        noticia.pais = pais;
        noticia.racialidad= raza;
        noticia.deporte = deporte;
        noticia.manifestacionArtistica = manifestacionartistica;
        await this.NoticiaRepository.save(noticia);
        return toNoticiaDto(noticia);
      }
    
      async edit(dto: NoticiaDTO, id: string) {
        const noticia = await this.NoticiaRepository.findOne(id);
        if (!noticia)
          throw new NotFoundException(`Esa noticia  no existe`);
    
        const noticiaUpdated = Object.assign(noticia, dto);
        return await this.NoticiaRepository.save(noticiaUpdated);
      }
    
      async delete(id: string) {
        return await this.NoticiaRepository.delete(id);
      }
    }
    
