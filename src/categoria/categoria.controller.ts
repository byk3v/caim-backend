import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CategoriaService } from './categoria.service';
  import { CreateCategoriaDto, CategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly CategoriaService: CategoriaService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getCategorias(@Query() query) {
      const codigo = query.codigo ? query.codigo : '';
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.CategoriaService.getCategorias(codigo);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getCategoria(@Param('id') id: string) {
      return this.CategoriaService.getbyId(id);
    }
  
    @Post()
    createCategoria(@Body() dto: CreateCategoriaDto) {
      return this.CategoriaService.createCategoria(dto); 
    }
  
    @Put(':id')
    updateCategoria(@Body() dto: CreateCategoriaDto, @Param('id') id) {
      return this.CategoriaService.editCategoria(dto, id);
    }
  
    @Delete(':id')
    deleteCategoria(@Param('id') id) {
      return this.CategoriaService.deleteCategoria(id);
    }
  }