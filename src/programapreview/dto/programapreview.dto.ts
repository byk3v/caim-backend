import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty} from '@nestjs/swagger'


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
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsString()
  canalId: string;

  emision?: string[];
}

export class UpdateProgramaPreviewDto extends PartialType(CreateProgramaPreviewDto) {}
