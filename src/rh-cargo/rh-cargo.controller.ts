import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RhCargoService } from './rh-cargo.service';
  import { CreateCargoDto, CargoDTO } from './dto/cargo.dto';

@Controller('cargo')
export class RhCargoController {
  constructor(private readonly rhCargoService: RhCargoService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.rhCargoService.getAll(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.rhCargoService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateCargoDto) {
      return this.rhCargoService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: CreateCargoDto, @Param('id') id) {
      return this.rhCargoService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.rhCargoService.delete(id);
    }
  }