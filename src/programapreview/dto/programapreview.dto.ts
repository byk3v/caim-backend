import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class ProgramaPreviewDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  logo: string;

  canalId: string;

  emision?: string[];
}

export class CreateProgramaPreviewDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  logo: string;

  canalId: string;

  emision?: string[];
}

export class UpdateProgramaPreviewDto extends PartialType(CreateProgramaPreviewDto) {}
