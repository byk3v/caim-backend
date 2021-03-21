import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class ActoresEconomicosDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  noticias?: string[];
}

export class CreateActoresEconomicosDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateActoresEconomicosDto extends PartialType(CreateActoresEconomicosDto) {}
