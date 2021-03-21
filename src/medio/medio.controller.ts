import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { MedioService } from './medio.service';
  import { CreateMedioDto, MedioDTO } from './entity/medio.dto';

@Controller('medio')
export class MedioController {
constructor(private readonly MedioService: MedioService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getMedios(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const logo = query.logo ? query.logo : '';
      
      const data = await this.MedioService.getMedio(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getMedio(@Param('id') id: string) {
      return this.MedioService.getbyId(id);
    }
  
    @Post()
    createMedio(@Body() dto: CreateMedioDto) {
      return this.MedioService.createMedio(dto);
    }
  
    @Put(':id')
    updateMedio(@Body() dto: MedioDTO, @Param('id') id) {
      return this.MedioService.editMedio(dto, id);
    }
  
    @Delete(':id')
    deleteMedio(@Param('id') id) {
      return this.MedioService.deleteMedio(id);
    }
  }