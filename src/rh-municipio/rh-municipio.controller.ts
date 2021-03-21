import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MunicipioDTO, CreateMunicipioDto } from './dto/municipio.dto';
import { RhMunicipioService } from './rh-municipio.service';

@Controller('rh-municipio')
export class RhMunicipioController {
  constructor(private readonly rhMunicipioService: RhMunicipioService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.rhMunicipioService.getAll(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.rhMunicipioService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateMunicipioDto) {//, @Body('idMedio')idMedio: string
      return this.rhMunicipioService.create(dto); //, idMedio
    }
  
    @Put(':id')
    update(@Body() dto: MunicipioDTO, @Param('id') id) {
      return this.rhMunicipioService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.rhMunicipioService.delete(id);
    }
  }
