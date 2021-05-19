import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty} from '@nestjs/swagger'


export class NoticiaDTO {
  @IsNotEmpty()  
  id: string;

  @IsString()
  ideaCentral: string;

  @IsString()
  incidencias: string;

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
  racialidadId?: string;

  @IsString()
  paisId?: string;

  @IsString()
  deporteId?: string;

  @IsString()
  manifestacionArtisticaId?: string;
}

export class CreateNoticiaDTO {
  @ApiProperty()
  @IsString()
  ideaCentral: string;

  @ApiProperty()
  @IsString()
  incidencias: string;

  @ApiProperty()
  @IsString()
  tareaOrdenamiento?: string;

  @ApiProperty()
  @IsString()
  entrevistados?: string;
  
  @ApiProperty()
  @IsString()
  imagen?: string;
  
  //@IsString()
  enlace?: string;

  //@IsString()
  compartidas?: string;

  //@IsString()
  comentarios?: string;

  //@IsString()
  interacciones?: string;

  //@IsString()
  total?: string;

  @ApiProperty()
  @IsString()
  emisionId: string;

  @ApiProperty()
  @IsString()
  generoPeriodisticoId: string;

  @ApiProperty()
  @IsArray()
  periodistas?: string[];

  @ApiProperty()
  @IsString()
  categoriaPrincipalId : string;
  
  @ApiProperty()
 @IsArray()
  tags?: string[];

  @ApiProperty()
  @IsString()
  politicaInformativaId?: string;
    
  @ApiProperty()
  @IsString()
  actoresEconomicosId?: string;

  @ApiProperty()
  @IsString()
  estadoId: string;
  
  @ApiProperty()
  @IsString()
  usuarioId: string;
  
  @ApiProperty()
  @IsString()
  territorioId: string;

  @ApiProperty()
  @IsString()
  whitejournalist: string;

  @ApiProperty()
  @IsString()
  blackjournalist: string;

  @ApiProperty()
  @IsString()
  halfbloodjournalist: string;

  @ApiProperty()
  @IsString()
  whiteguest: string;

  @ApiProperty()
  @IsString()
  blackguest: string;

  @ApiProperty()
  @IsString()
  halfbloodguest: string;

  @ApiProperty()
  @IsString()
  paisId: string;

  @ApiProperty()
  @IsString()
  deporteId: string;

  @ApiProperty()
  @IsString()
  manifestacionArtisticaId: string;
}

export class UpdateNoticiaDTO extends PartialType(CreateNoticiaDTO) {}
