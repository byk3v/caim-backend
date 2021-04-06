import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IndicacionesDto, CreateIndicacionesDto } from './dto/indicaciones.dto';
import { IndicacionesService } from './indicaciones.service';

@Controller('indicaciones')
export class IndicacionesController {
  constructor(private readonly indicacionesService: IndicacionesService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getAll() {
    const data = await this.indicacionesService.getAll();
    
    return {
      message: 'Peticion correcta',
      data: data,
    };
  }

  @Get(':id')
  getbyId(@Param('id') id: string) {
    return this.indicacionesService.getbyId(id);
  }

  @Post()
  create(@Body() dto: CreateIndicacionesDto) {//, Me falta por poner los tags
    return this.indicacionesService.create(dto); 
  }

  @Put(':id')
  update(@Body() dto: IndicacionesDto, @Param('id') id) {
    return this.indicacionesService.edit(dto, id);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.indicacionesService.delete(id);
  }
}
