import { IsString, IsNotEmpty } from 'class-validator';
import { CanalDTO} from '../../canal/entity/canal.dto'

export class MedioDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  logo: string;

  canales?: string[];
}

export class CreateMedioDto {
  @IsString()
  nombre: string;

  @IsString()
  logo: string;
}
