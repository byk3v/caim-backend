import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ManifestacionartisticaService } from './manifestacionartistica.service';
  import { CreateManifestacionArtisticaDto, ManifestacionArtisticaDTO } from './dto/manifestacionartistica.dto';


@Controller('manifestacionartistica')
export class ManifestacionartisticaController {
  constructor(private readonly ManifestacionartisticaService: ManifestacionartisticaService) {}
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getManifestacionArtistica(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.ManifestacionartisticaService.getManifestacionArtistica(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getManifestacion(@Param('id') id: string) {
      return this.ManifestacionartisticaService.getbyId(id);
    }
  
    @Post()
    createManifestacion(@Body() dto: CreateManifestacionArtisticaDto) {
      return this.ManifestacionartisticaService.createManifestacion(dto); 
    }
  
    @Put(':id')
    updateManifestacion(@Body() dto: CreateManifestacionArtisticaDto, @Param('id') id) {
      return this.ManifestacionartisticaService.editManifestacion(dto, id);
    }
  
    @Delete(':id')
    deleteManifestacion(@Param('id') id) {
      return this.ManifestacionartisticaService.deleteManifestacion(id);
    }
  }