import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RhTarifaxcargoService } from './rh-tarifaxcargo.service';
import { TarifaXCargoDTO, CreateTarifaXCargoDto } from './dto/tarifaxcargo.dto';

@Controller('tarifaxcargo')
export class RhTarifaxcargoController {
  constructor(private readonly RhTarifaxcargoService: RhTarifaxcargoService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const tarifa = query.tarifa ? query.tarifa : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.RhTarifaxcargoService.getAll(tarifa);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.RhTarifaxcargoService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateTarifaXCargoDto) {//, @Body('idMedio')idMedio: string
      return this.RhTarifaxcargoService.create(dto); //, idMedio
    }
  
    @Put(':id')
    update(@Body() dto: TarifaXCargoDTO, @Param('id') id) {
      return this.RhTarifaxcargoService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.RhTarifaxcargoService.delete(id);
    }
  }