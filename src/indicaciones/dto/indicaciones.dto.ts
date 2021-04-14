import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty} from '@nestjs/swagger'

export class IndicacionesDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  texto: string;

  @IsString()
  activa: string;

  @IsString()
  emisorId: string;

  @IsString()
  receptorId: string;

  @IsString()
  rolId: string;
}

export class CreateIndicacionesDto {
  @ApiProperty()  
    texto: string;
  
    @ApiProperty()
    activa: string;
  
    @ApiProperty()
    emisorId: string;
  
    @ApiProperty()
    receptorId: string;
  
    @ApiProperty()
    rolId: string;
}

export class UpdateIndicacionesDto extends PartialType(CreateIndicacionesDto) {}
