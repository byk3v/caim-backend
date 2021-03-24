import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class PeriodistaDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreatePeriodistaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdatePeriodistaDto extends PartialType(CreatePeriodistaDto) {}
