import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, UseInterceptors, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProgramapreviewService } from './programapreview.service';
import { CreateProgramaPreviewDto, ProgramaPreviewDto } from './dto/programapreview.dto';

@Controller('programapreview')
export class ProgramapreviewController {
  constructor(private readonly programapreviewService: ProgramapreviewService) {}

  @Get()
    //@UseGuards(JwtAuthGuard)
    async getAll(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const data = await this.programapreviewService.getAll(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getbyId(@Param('id') id: string) {
      return this.programapreviewService.getbyId(id);
    }
  
    @Post()
    create(@Body() dto: CreateProgramaPreviewDto) {
      return this.programapreviewService.create(dto); 
    }
  
    @Put(':id')
    update(@Body() dto: CreateProgramaPreviewDto, @Param('id') id) {
      return this.programapreviewService.edit(dto, id);
    }
  
    @Delete(':id')
    delete(@Param('id') id) {
      return this.programapreviewService.delete(id);
    }
  }
