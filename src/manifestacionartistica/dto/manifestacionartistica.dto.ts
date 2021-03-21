import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class ManifestacionArtisticaDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateManifestacionArtisticaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateManifestacionArtisticaDto extends PartialType(CreateManifestacionArtisticaDto) {}
