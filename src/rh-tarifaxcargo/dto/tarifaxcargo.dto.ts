import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class TarifaXCargoDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  tarifa: string;

  @IsString()
  descripcion: string;

  cargoId: string;
}

export class CreateTarifaXCargoDto {
  @IsString()
  tarifa: string;

  @IsString()
  descripcion: string;
  
  @IsString()
  cargoId: string;
}

export class UpdateTarifaXCargoDto extends PartialType(CreateTarifaXCargoDto) {}
