import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NoticiaDTO, CreateNoticiaDTO } from './entity/noticia.dto';
import { NoticiaService } from './noticia.service';

@Controller('noticia')
export class NoticiaController {
  constructor(private readonly NoticiaService: NoticiaService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll() {
      const data = await this.NoticiaService.getAll();
      
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.NoticiaService.getbyId(id);
    }

    @Get('newsByUser/:id')
    getNewsByUser(@Param('id') id: string) {
      return this.NoticiaService.findNewsbyUser(id);
    }
  
    @Get('newsByState/:id')
    getNewsByState(@Param('id') id: string) {
      return this.NoticiaService.findNewsbyState(id);
    }

    @Post()
    create(@Body() dto: CreateNoticiaDTO) {//, Me falta por poner los tags
      return this.NoticiaService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: NoticiaDTO, @Param('id') id) {
      return this.NoticiaService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.NoticiaService.delete(id);
    }
  }
