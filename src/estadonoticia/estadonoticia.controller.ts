import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { EstadonoticiaService } from './estadonoticia.service';
  import { CreateEstadoNoticiaDto, EstadoNoticiaDTO } from './dto/estadonoticia.dto';

@Controller('estadonoticia')
export class EstadonoticiaController {
    constructor(private readonly EstadonoticiaService: EstadonoticiaService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getEstados(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.EstadonoticiaService.getEstados(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getEstado(@Param('id') id: string) {
      return this.EstadonoticiaService.getbyId(id);
    }
  
    @Post()
    createEstado(@Body() dto: CreateEstadoNoticiaDto) {
      return this.EstadonoticiaService.createEstado(dto); 
    }
  
    @Put(':id')
    updateEstado(@Body() dto: CreateEstadoNoticiaDto, @Param('id') id) {
      return this.EstadonoticiaService.editEstado(dto, id);
    }
  
    @Delete(':id')
    deleteEstado(@Param('id') id) {
      return this.EstadonoticiaService.deleteEstado(id);
    }
  }