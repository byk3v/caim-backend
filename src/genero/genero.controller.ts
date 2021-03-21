import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { GeneroService } from './genero.service';
  import { CreateGeneroPeriodisticoDto, GeneroPeriodisticoDTO } from './dto/genero.dto';

@Controller('genero')
export class GeneroController {
    constructor(private readonly GeneroService: GeneroService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getGeneros(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.GeneroService.getGeneros(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getGenero(@Param('id') id: string) {
      return this.GeneroService.getbyId(id);
    }
  
    @Post()
    createDeporte(@Body() dto: CreateGeneroPeriodisticoDto) {
      return this.GeneroService.createGenero(dto); 
    }
  
    @Put(':id')
    updateDeporte(@Body() dto: GeneroPeriodisticoDTO, @Param('id') id) {
      return this.GeneroService.editGenero(dto, id);
    }
  
    @Delete(':id')
    deleteDeporte(@Param('id') id) {
      return this.GeneroService.deleteGenero(id);
    }
  }