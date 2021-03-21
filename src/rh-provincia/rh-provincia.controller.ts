import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RhProvinciaService } from './rh-provincia.service';
  import { CreateProvinciaDto, ProvinciaDTO } from './dto/provincia.dto';

@Controller('rh-provincia')
export class RhProvinciaController {
  constructor(private readonly rhProvinciaService: RhProvinciaService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.rhProvinciaService.getAll(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.rhProvinciaService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateProvinciaDto) {
      return this.rhProvinciaService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: CreateProvinciaDto, @Param('id') id) {
      return this.rhProvinciaService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.rhProvinciaService.delete(id);
    }
  }