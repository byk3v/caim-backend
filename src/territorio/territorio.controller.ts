import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { TerritorioService } from './territorio.service';
  import { CreateTerritorioDto, TerritorioDTO } from './dto/territorio.dto';

@Controller('territorio')
export class TerritorioController {
    constructor(private readonly TerritorioService: TerritorioService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getTerritorios(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.TerritorioService.getTerritorios(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getTerritorio(@Param('id') id: string) {
      return this.TerritorioService.getbyId(id);
    }
  
    @Post()
    createTerritorio(@Body() dto: CreateTerritorioDto) {
      return this.TerritorioService.createTerritorio(dto); 
    }
  
    @Put(':id')
    updateTerritorio(@Body() dto: CreateTerritorioDto, @Param('id') id) {
      return this.TerritorioService.editTerritorio(dto, id);
    }
  
    @Delete(':id')
    deleteTerritorio(@Param('id') id) {
      return this.TerritorioService.deleteTerritorio(id);
    }
  }