import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class NoticiaDTO {
  @IsNotEmpty()  
  id: string;

  @IsString()
  ideaCentral: string;

  @IsString()
  valoracion: string;

  @IsString()
  tareaOrdenamiento?: string;

  @IsString()
  entrevistados?: string;
  
  @IsString()
  imagen?: string;
  
  @IsString()
  enlace?: string;

  @IsString()
  compartidas?: string;

  @IsString()
  comentarios?: string;

  @IsString()
  interacciones?: string;

  @IsString()
  total?: string;

  @IsString()
  emisionId: string;

  @IsString()
  generoPeriodisticoId: string;
  
  @IsArray()
  periodistas?: string[];

  @IsString()
  categoriaPrincipalId : string;
  
  @IsArray()
  tags?: string[];

  @IsString()
  politicaInformativaId?: string;
    
  @IsString()
  actoresEconomicosId?: string;

  @IsString()
  estadoId: string;
  
  @IsString()
  usuarioId: string;
  
  @IsString()
  territorioId?: string;

  @IsString()
  paisId?: string;

  @IsString()
  deporteId?: string;

  @IsString()
  manifestacionArtisticaId?: string;
}

export class CreateNoticiaDTO {
  @IsString()
  ideaCentral: string;

  @IsString()
  valoracion: string;

  @IsString()
  tareaOrdenamiento?: string;

  @IsString()
  entrevistados?: string;
  
  @IsString()
  imagen?: string;
  
  @IsString()
  enlace?: string;

  @IsString()
  compartidas?: string;

  @IsString()
  comentarios?: string;

  @IsString()
  interacciones?: string;

  @IsString()
  total?: string;

  @IsString()
  emisionId: string;

  @IsString()
  generoPeriodisticoId: string;

  @IsArray()
  periodistas?: string[];

  @IsString()
  categoriaPrincipalId : string;
  
 @IsArray()
  tags?: string[];

  @IsString()
  politicaInformativaId?: string;
    
  @IsString()
  actoresEconomicosId?: string;

  @IsString()
  estadoId: string;
  
  @IsString()
  usuarioId: string;
  
  @IsString()
  territorioId?: string;

  @IsString()
  paisId?: string;

  @IsString()
  deporteId?: string;

  @IsString()
  manifestacionArtisticaId?: string;
}

export class UpdateNoticiaDTO extends PartialType(CreateNoticiaDTO) {}
