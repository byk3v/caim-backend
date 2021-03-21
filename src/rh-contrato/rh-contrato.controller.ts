import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContratoDTO, CreateContratoDTO } from './dto/contrato.dto';
import { RhContratoService } from './rh-contrato.service';

@Controller('rh-contrato')
export class RhContratoController {
  constructor(private readonly rhContratoService: RhContratoService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll() {
      const data = await this.rhContratoService.getAll();
      
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.rhContratoService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateContratoDTO) {//, @Body('idMedio')idMedio: string
      return this.rhContratoService.create(dto); //, idMedio
    }
  
    @Put(':id')
    update(@Body() dto: ContratoDTO, @Param('id') id) {
      return this.rhContratoService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.rhContratoService.delete(id);
    }
  }
