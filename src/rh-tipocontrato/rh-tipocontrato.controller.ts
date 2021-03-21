import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RhTipocontratoService } from './rh-tipocontrato.service';
import { CreateTipoContratoDto, TipoContratoDTO } from './dto/tipocontrato.dto';

@Controller('tipocontrato')
export class RhTipocontratoController {
  constructor(private readonly rhTipocontratoService: RhTipocontratoService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getTipoContratos(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.rhTipocontratoService.getTipoContratos(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getTipoContrato(@Param('id') id: string) {
      return this.rhTipocontratoService.getbyId(id);
    }
  
    @Post()
    createTipoContrato(@Body() dto: CreateTipoContratoDto) {
      return this.rhTipocontratoService.createTipoContrato(dto); 
    }
  
    @Put(':id')
    updateTipoContrato(@Body() dto: CreateTipoContratoDto, @Param('id') id) {
      return this.rhTipocontratoService.editTipoContrato(dto, id);
    }
  
    @Delete(':id')
    deleteTipoContrato(@Param('id') id) {
      return this.rhTipocontratoService.deleteTipoContrato(id);
    }
  }