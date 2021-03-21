import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, UseInterceptors, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RhPersonaService } from './rh-persona.service';
import { PersonaDTO, CreatePersonaDto } from './dto/persona.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadedFile } from '@nestjs/common';

@Controller('rh-persona')
export class RhPersonaController {
  constructor(private readonly rhPersonaService: RhPersonaService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const ci = query.ci ? query.ci : '';
      
      const data = await this.rhPersonaService.getAll(nombre, ci);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.rhPersonaService.getbyId(id);
    }
  
    @Post()
    @UseInterceptors(FileInterceptor('file',{
      dest: './upload/fotos/personas'}))
    create(@Body() dto: CreatePersonaDto, @UploadedFile() file: Express.Multer.File) {  
        console.log(file);
        return this.rhPersonaService.create(dto, file); 
    }
  
    @Put(':id')
    update(@Body() dto: PersonaDTO, @Param('id') id) {
      return this.rhPersonaService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.rhPersonaService.delete(id);
    }
  }
