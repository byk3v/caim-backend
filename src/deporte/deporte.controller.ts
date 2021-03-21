import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { DeporteService } from './deporte.service';
  import { CreateDeporteDto, DeporteDTO } from './dto/deporte.dto';

@Controller('deporte')
export class DeporteController {
    constructor(private readonly DeporteService: DeporteService) {}
    @Get('tube')
    getYoutube() {
      return this.DeporteService.pruebaYoutube();
    }
    
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getDeportes(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.DeporteService.getDeportes(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getDeporte(@Param('id') id: string) {
      return this.DeporteService.getbyId(id);
    }
  
    @Post()
    createDeporte(@Body() dto: CreateDeporteDto) {
      return this.DeporteService.createDeporte(dto); 
    }
  
    @Put(':id')
    updateDeporte(@Body() dto: CreateDeporteDto, @Param('id') id) {
      return this.DeporteService.editDeporte(dto, id);
    }
  
    @Delete(':id')
    deleteDeporte(@Param('id') id) {
      return this.DeporteService.deleteDeporte(id);
    }

    
  }