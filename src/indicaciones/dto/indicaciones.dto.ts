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
  @IsString()  
  texto: string;
  
  @ApiProperty()
  @IsString()
    activa: string;
  
    @ApiProperty()
    @IsString()
    emisorId: string;
  
    @ApiProperty()
    @IsString()
    receptorId: string;
  
    @ApiProperty()
    @IsString()
    rolId: string;
}

export class UpdateIndicacionesDto extends PartialType(CreateIndicacionesDto) {}
