import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class ContratoDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  duracion: string;

  activo: boolean;

  personaId: string;

  cargoId: string;

  tipoContratoId: string;
}

export class CreateContratoDTO {
    @IsString()
    duracion: string;
  
    activo: boolean;
  
    personaId: string;
  
    cargoId: string;
  
    tipoContratoId: string;
}

export class UpdateContratoDTO extends PartialType(CreateContratoDTO) {}
