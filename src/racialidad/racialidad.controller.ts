import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, UseInterceptors, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RacialidadService } from './racialidad.service';
import { CreateRacialidadDto, RacialidadDto } from './dto/racialidad.dto';

@Controller('racialidad')
export class RacialidadController {
  constructor(private readonly racialidadService: RacialidadService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const data = await this.racialidadService.getAll();
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.racialidadService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateRacialidadDto) {
      return this.racialidadService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: CreateRacialidadDto, @Param('id') id) {
      return this.racialidadService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.racialidadService.delete(id);
    }
  }
