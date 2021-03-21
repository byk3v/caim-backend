import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRolDto } from './dtos/create-rol.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRoles() {
    const data = await this.RoleService.getRoles();
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getRol(@Param('id', ParseIntPipe) id: number) {
    return this.RoleService.getbyId(id);
  }

  @Post()
  createRol(@Body() rol: CreateRolDto) {
    console.log(rol);
    return this.RoleService.createRol(rol);
  }

  @Put(':id')
  updateRol(@Body() rol: CreateRolDto, @Param('id') id) {
    console.log(rol);
    return this.RoleService.editRol(id, rol);
  }

  @Delete(':id')
  deleteRol(@Param('id') id) {
    return this.RoleService.deleteRol(id);
  }
}
