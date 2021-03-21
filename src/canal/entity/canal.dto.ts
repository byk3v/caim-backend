import { IsString, IsNotEmpty } from 'class-validator';
import { MedioDTO, CreateMedioDto} from '../../medio/entity/medio.dto'

export class CanalDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  logo: string;

  medioId: string;

  emisiones?: string[];
}

export class CreateCanalDto {
  @IsString()
  nombre: string;

  @IsString()
  logo: string;

  @IsString()
  medioId: string;
}
