import { UserDto } from '../user/dtos/userDto';
import { User } from '../user/entities/user.entity';

import { RolDto } from '../role/dtos/rolDto';
import { Role } from '../role/entities/role.entity';

import { CanalDTO} from '../canal/entity/canal.dto'
import { Canal } from '../canal/entity/canal.entity';
import { MedioDTO} from '../medio/entity/medio.dto'
import { Medio } from '../medio/entity/medios.entity';
import { EmisionDTO} from '../emision/entity/emision.dto'
import { Emision } from '../emision/entity/emision.entity';
import { Deporte } from '../deporte/entities/deporte.entity';
import { DeporteDTO } from '../deporte/dto/deporte.dto';
import { GeneroPeriodistico } from '../genero/entities/genero.entity';
import { GeneroPeriodisticoDTO } from '../genero/dto/genero.dto';
import { PoliticaInformativa } from '../politicainformativa/entities/politicainformativa.entity';
import { PoliticaInformativaDTO } from '../politicainformativa/dto/politicainformativa.dto';
import { Pais } from '../pais/entities/pais.entity';
import { PaisDTO } from '../pais/dto/pais.dto';
import { Territorio } from '../territorio/entities/territorio.entity';
import { TerritorioDTO } from '../territorio/dto/territorio.dto';
import { ActoresEconomicos } from '../actoreseconomicos/entities/actoreseconomico.entity';
import { ActoresEconomicosDto } from '../actoreseconomicos/dto/actoreseconomicos.dto';
import { EstadoNoticia } from '../estadonoticia/entities/estadonoticia.entity';
import { EstadoNoticiaDTO } from '../estadonoticia/dto/estadonoticia.dto';
import { ManifestacionArtistica } from '../manifestacionartistica/entities/manifestacionartistica.entity';
import { ManifestacionArtisticaDTO } from '../manifestacionartistica/dto/manifestacionartistica.dto';
import { Categoria } from '../categoria/entities/categoria.entity';
import { CategoriaDto } from '../categoria/dto/categoria.dto';
import { TipoContrato } from '../rh-tipocontrato/entities/rh-tipocontrato.entity';
import { TipoContratoDTO } from '../rh-tipocontrato/dto/tipocontrato.dto';
import { Cargo } from 'src/rh-cargo/entities/rh-cargo.entity';
import { CargoDTO } from 'src/rh-cargo/dto/cargo.dto';
import { Provincia } from 'src/rh-provincia/entities/rh-provincia.entity';
import { ProvinciaDTO } from 'src/rh-provincia/dto/provincia.dto';
import { TarifaCargo } from 'src/rh-tarifaxcargo/entities/rh-tarifaxcargo.entity';
import { TarifaXCargoDTO } from 'src/rh-tarifaxcargo/dto/tarifaxcargo.dto';
import { Municipio } from '../rh-municipio/entities/rh-municipio.entity';
import { MunicipioDTO } from '../rh-municipio/dto/municipio.dto';
import { Persona } from '../rh-persona/entities/rh-persona.entity';
import { PersonaDTO } from '../rh-persona/dto/persona.dto';
import { Contrato } from '../rh-contrato/entities/rh-contrato.entity';
import { ContratoDTO } from '../rh-contrato/dto/contrato.dto';
import { Noticia } from '../noticia/entity/noticia.entity';
import { NoticiaDTO} from '../noticia/entity/noticia.dto'
import { Periodista } from 'src/periodista/entities/periodista.entity';
import { PeriodistaDto } from 'src/periodista/dto/periodista.dto';
import { Programapreview } from 'src/programapreview/entities/programapreview.entity';
import { ProgramaPreviewDto } from 'src/programapreview/dto/programapreview.dto';
import { Racialidad } from 'src/racialidad/entities/racialidad.entity';
import { RacialidadDto } from 'src/racialidad/dto/racialidad.dto';
import { Indicacion } from 'src/indicaciones/entities/indicaciones.entity';
import { IndicacionesDto } from 'src/indicaciones/dto/indicaciones.dto';


export const toUserDto = (data: User): UserDto => {
  const { id, username, email, refreshtoken, refreshtokenExpires } = data;
  return { id, username, email, refreshtoken, refreshtokenExpires };
};

export const toRolDto = (data: Role): RolDto => {
  const { name, description } = data;
  return { name, description };
};

export const toCanalDto = (data: Canal): CanalDTO => {
  const { id, nombre, logo, medio } = data;
  const medioId = medio.id;
  return { id, nombre, logo, medioId };
    //medio: medio ? toMedioDto(medio) : null };
};

export const toMedioDto = (data: Medio): MedioDTO => {
  const { id, nombre, logo } = data;
  return { id, nombre, logo };

};export const toEmisionDto = (data: Emision): EmisionDTO => {
  const { id, nombre, programa, canal } = data;
  const canalId = canal.id;
  const programpreviewId = programa.id;
  return { id, nombre, canalId, programpreviewId };
};

export const toDeporteDto = (data: Deporte): DeporteDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toGeneroDto = (data: GeneroPeriodistico): GeneroPeriodisticoDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toPoliticaInformativaDto = (data: PoliticaInformativa): PoliticaInformativaDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toPaisDto = (data: Pais): PaisDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toTerritorioDto = (data: Territorio): TerritorioDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toActorEconomicoDto = (data: ActoresEconomicos): ActoresEconomicosDto => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toEstadoNoticiaDto = (data: EstadoNoticia): EstadoNoticiaDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toManifestacionArtisticaDto = (data: ManifestacionArtistica): ManifestacionArtisticaDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toCategoriaDto = (data: Categoria): CategoriaDto => {
  const { id, codigo, nombre, descripcion } = data;
  return { id, codigo, nombre, descripcion };
};

export const toTipoContratoDto = (data: TipoContrato): TipoContratoDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const tocargoDto = (data: Cargo): CargoDTO => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toProvinciaDto = (data: Provincia): ProvinciaDTO => {
  const { id, nombre } = data;
  return { id, nombre};
};

export const toTarifaCargoDto = (data: TarifaCargo): TarifaXCargoDTO => {
  const { id, tarifa, descripcion, cargo } = data;
  const cargoId = cargo.id;
  return { id, tarifa, descripcion, cargoId };
};

export const toMunicipioDto = (data: Municipio): MunicipioDTO => {
  const { id, nombre, descripcion, provincia } = data;
  const provinciaId = provincia.id;
  return { id, nombre, descripcion, provinciaId };
};

export const toPersonaDto = (data: Persona): PersonaDTO => {
  const { id, ci, nombre, primerApellido, segundoApellido, fechaNacimiento, telefCelular, telefFijo, email, direccion, sexo, activo, foto, municipio } = data;
  const municipioId = municipio.id;
  return { id, ci, nombre, primerApellido, segundoApellido, fechaNacimiento, telefCelular, telefFijo, email, direccion, sexo, activo, foto, municipioId };
};

export const toContratoDto = (data: Contrato): ContratoDTO => {
  const { id, duracion, activo, cargo, tipocontrato, persona } = data;
  const cargoId = cargo.id;
  const tipoContratoId = tipocontrato.id;
  const personaId = persona.id;

  return { id, duracion, activo, cargoId, tipoContratoId, personaId };
};

export const toNoticiaDto = (data: Noticia): NoticiaDTO => {
  const { id, ideaCentral, valoracion, tareaOrdenamiento, entrevistados, imagen, enlace, compartidas, comentarios, interacciones, total, emision, generoPeriodistico, periodistas, categoriaPrincipal, tags, politicaInformativa, actoresEconomicos, usuario, estado, territorio, pais, racialidad, deporte, manifestacionArtistica } = data;
  
  const emisionId = emision.id ? emision.id : '';
  const generoPeriodisticoId = generoPeriodistico ? generoPeriodistico.id : '';
  const categoriaPrincipalId = categoriaPrincipal ? categoriaPrincipal.id : '';
  const politicaInformativaId = politicaInformativa ? politicaInformativa.id : '';
  const actoresEconomicosId = actoresEconomicos ? actoresEconomicos.id : '';
  const usuarioId = usuario ? usuario.id : '';
  const estadoId = estado ? estado.id : '';
  const territorioId = territorio ? territorio.id : '';
  const paisId = pais ? pais.id : '';
  const racialidadId = racialidad ? racialidad.id : '';
  const deporteId = deporte ? deporte.id : '';
  const manifestacionArtisticaId = manifestacionArtistica ? manifestacionArtistica.id : '';
  

  return { id, ideaCentral, valoracion, tareaOrdenamiento, entrevistados, imagen, enlace, compartidas, comentarios, interacciones, total, emisionId, generoPeriodisticoId, categoriaPrincipalId, politicaInformativaId, actoresEconomicosId, usuarioId, estadoId, territorioId, paisId, racialidadId, deporteId, manifestacionArtisticaId };
};

export const toPeriodistaDto = (data: Periodista): PeriodistaDto => {
  const { id, nombre, descripcion } = data;
  return { id, nombre, descripcion };
};

export const toProgramaDto = (data: Programapreview): ProgramaPreviewDto => {
  const { id, nombre, descripcion, logo, canal } = data;
  const canalId = canal ? canal.id : '';
  return { id, nombre, descripcion, logo, canalId };
};

export const toRacialidadDto = (data: Racialidad): RacialidadDto => {
  const { id, whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest } = data;
  return { id, whitejournalist, blackjournalist, halfbloodjournalist, whiteguest, blackguest, halfbloodguest};
};

export const toIndicacionDto = (data: Indicacion): IndicacionesDto => {
  const { id, texto, activa, emisor, receptor, rol } = data;
  const emisorId = emisor ? emisor.id : '';
  const receptorId = receptor ? receptor.id : '';
  const rolId = rol ? rol.id : '';
  return { id, texto, activa, emisorId, receptorId, rolId };
};

