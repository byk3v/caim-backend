import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ActoreseconomicosService } from './actoreseconomicos.service';
  import { CreateActoresEconomicosDto, ActoresEconomicosDto } from './dto/actoreseconomicos.dto';

@Controller('actoreseconomicos')
export class ActoreseconomicosController {
    constructor(private readonly ActorEconomicoService: ActoreseconomicosService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getActores(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.ActorEconomicoService.getActores(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getActor(@Param('id') id: string) {
      return this.ActorEconomicoService.getbyId(id);
    }
  
    @Post()
    createActor(@Body() dto: CreateActoresEconomicosDto) {
      return this.ActorEconomicoService.createActorEconomico(dto); 
    }
  
    @Put(':id')
    updateActor(@Body() dto: CreateActoresEconomicosDto, @Param('id') id) {
      return this.ActorEconomicoService.editActores(dto, id);
    }
  
    @Delete(':id')
    deleteActor(@Param('id') id) {
      return this.ActorEconomicoService.deleteActores(id);
    }
  }