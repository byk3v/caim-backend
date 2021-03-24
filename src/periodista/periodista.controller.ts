import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, UseInterceptors, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PeriodistaService } from './periodista.service';
import { CreatePeriodistaDto, PeriodistaDto } from './dto/periodista.dto';

@Controller('periodista')
export class PeriodistaController {
  constructor(private readonly periodistaService: PeriodistaService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const data = await this.periodistaService.getAll(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.periodistaService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreatePeriodistaDto) {
      return this.periodistaService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: CreatePeriodistaDto, @Param('id') id) {
      return this.periodistaService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.periodistaService.delete(id);
    }
  }
