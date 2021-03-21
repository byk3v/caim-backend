import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CargoDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  contratos?: string[];

  tarifaxcargos?: string[];
}

export class CreateCargoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}

export class UpdateCargoDto extends PartialType(CreateCargoDto) {}
