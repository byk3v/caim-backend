import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { PaisService } from './pais.service';
  import { CreatePaisDto, PaisDTO } from './dto/pais.dto';

@Controller('pais')
export class PaisController {
    constructor(private readonly PaisService: PaisService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getPaises(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.PaisService.getPais(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getPais(@Param('id') id: string) {
      return this.PaisService.getbyId(id);
    }
  
    @Post()
    createPais(@Body() dto: CreatePaisDto) {
      return this.PaisService.createPais(dto); 
    }
  
    @Put(':id')
    updatePais(@Body() dto: CreatePaisDto, @Param('id') id) {
      return this.PaisService.editPais(dto, id);
    }
  
    @Delete(':id')
    deletePais(@Param('id') id) {
      return this.PaisService.deletePais(id);
    }
  }