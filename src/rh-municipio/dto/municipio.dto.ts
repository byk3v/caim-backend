import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class MunicipioDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  provinciaId: string;
}

export class CreateMunicipioDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
  
  @IsString()
  provinciaId: string;
}

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {}
