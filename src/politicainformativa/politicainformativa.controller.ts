import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
import { PoliticaInfService } from './politicainformativa.service';
import { CreatePoliticaInformativaDto, PoliticaInformativaDTO } from './dto/politicainformativa.dto';

@Controller('politicainformativa')
export class PoliticainformativaController {
  constructor(private readonly politicainformativaService: PoliticaInfService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getPoliticaInformativa(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.politicainformativaService.getPoliticaInformativa(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }

  @Get(':id')
    getDeporte(@Param('id') id: string) {
      return this.politicainformativaService.getbyId(id);
    }
  
    @Post()
    createDeporte(@Body() dto: CreatePoliticaInformativaDto) {
      return this.politicainformativaService.createPoliticaInformativa(dto); 
    }
  
    @Put(':id')
    updateDeporte(@Body() dto: CreatePoliticaInformativaDto, @Param('id') id) {
      return this.politicainformativaService.editPoliticaInformativa(dto, id);
    }
  
    @Delete(':id')
    deleteDeporte(@Param('id') id) {
      return this.politicainformativaService.deletePoliticaInformativa(id);
    }
  }