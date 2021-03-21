import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CanalService } from './canal.service';
  import { CreateCanalDto, CanalDTO } from './entity/canal.dto';

@Controller('canal')
export class CanalController {
constructor(private readonly CanalService: CanalService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getCanales(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const logo = query.logo ? query.logo : '';
      
      const data = await this.CanalService.getCanal(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getCanal(@Param('id') id: string) {
      return this.CanalService.getbyId(id);
    }
  
    @Post()
    createCanal(@Body() dto: CreateCanalDto) {//, @Body('idMedio')idMedio: string
      return this.CanalService.createCanal(dto); //, idMedio
    }
  
    @Put(':id')
    updateCanal(@Body() dto: CanalDTO, @Param('id') id) {
      return this.CanalService.editCanal(dto, id);
    }
  
    @Delete(':id')
    deleteCanal(@Param('id') id) {
      return this.CanalService.deleteCanal(id);
    }
  }