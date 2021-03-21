import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class PersonaDTO {
  @IsNotEmpty()
  
  id: string;

  @IsString()
  ci: string;

  @IsString()
  nombre: string;

  @IsString()
  primerApellido: string;

  @IsString()
  segundoApellido: string;

  //@IsString()             //date Averiguar bien lo del date
  fechaNacimiento: Date;

  @IsString()
  telefCelular: string;

  @IsString()
  telefFijo: string;

  @IsString()
  email: string;

  @IsString()
  direccion: string;

  @IsString()
  sexo: string;

  //@IsBoolean()         
  activo: boolean;

  @IsString()
  foto: string;

  @IsString()
  municipioId: string;

  contratos?: string[];

  users?: string[];
}

export class CreatePersonaDto {
    @IsString()
    ci: string;
  
    @IsString()
    nombre: string;
  
    @IsString()
    primerApellido: string;
  
    @IsString()
    segundoApellido: string;
  
    
    fechaNacimiento: Date;
  
    @IsString()
    telefCelular: string;
  
    @IsString()
    telefFijo: string;
  
    @IsString()
    email: string;
  
    @IsString()
    direccion: string;
  
    @IsString()
    sexo: string;
  
    //@IsBoolean()         
    activo: boolean;

    @IsString()
  foto: string;
  
    @IsString()
    municipioId: string;
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
