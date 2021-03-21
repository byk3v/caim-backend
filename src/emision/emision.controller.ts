import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { EmisionService } from './emision.service';
  import { CreateEmisionDto, EmisionDTO } from './entity/emision.dto';

@Controller('emision')
export class EmisionController {
    constructor(private readonly EmisionService: EmisionService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getEmisiones(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const logo = query.logo ? query.logo : '';
      
      const data = await this.EmisionService.getEmision(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getEmision(@Param('id') id: string) {
      return this.EmisionService.getbyId(id);
    }
  
    @Post()
    createEmision(@Body() dto: CreateEmisionDto) {
      return this.EmisionService.createEmision(dto); //, idMedio
    }
  
    @Put(':id')
    updateEmision(@Body() dto: EmisionDTO, @Param('id') id) {
      return this.EmisionService.editEmision(dto, id);
    }
  
    @Delete(':id')
    deleteEmision(@Param('id') id) {
      return this.EmisionService.deleteEmision(id);
    }
  }