import { IsString, IsNotEmpty } from 'class-validator';
import { CanalDTO} from '../../canal/entity/canal.dto'

export class EmisionDTO {
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  logo: string;

  canalId: string;

  noticias?: string[];
}

export class CreateEmisionDto {
  @IsString()
  nombre: string;

  @IsString()
  logo: string;

  canalId: string;
}
