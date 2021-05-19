import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,Query, } from '@nestjs/common';

  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { DeporteService } from './deporte.service';
  import { CreateDeporteDto, DeporteDTO } from './dto/deporte.dto';
  import {YoutubeDataAPI } from 'youtube-v3-api';
  import {google} from 'googleapis'
import { response } from 'express';

@Controller('deporte')
export class DeporteController {
    constructor(private readonly DeporteService: DeporteService) {}
    @Get('tube')
    getYoutube() {
      //return this.DeporteService.pruebaYoutube();
      const API_KEY = 'AIzaSyDbnQRxXiPFIV5JsFRvbOOPSiJJ4csrohc';
      const api = new YoutubeDataAPI(API_KEY);
      const idchanel = "UCMn28O1sQGochG94HdlthbA";
      api.searchChannel(idchanel).then((data) => {
        console.log(data);
    },(err) => {
        console.error(err);
    })

    }

    @Get('googleapis')
    getGoogleapis() {
      const API_KEY = 'AIzaSyDbnQRxXiPFIV5JsFRvbOOPSiJJ4csrohc';
      const part = ['snippet'];
      const idchanel = "UCMn28O1sQGochG94HdlthbA";
      
      google.youtube('v3').search.list({
        key: API_KEY,
        part: part,
        q: 'messi',
        maxResults: 10,
      }).then((response)=>{
        const {data} = response;
        data.items.forEach((item)=>{
          console.log(`Titulo: ${item.snippet.title}\nDescripcion: ${item.snippet.description}\n`)
        })
      }).catch((err)=> console.log(err));

    }
    
    @Get()
    //@UseGuards(JwtAuthGuard)
    async getDeportes(@Query() query) {
      const nombre = query.nombre ? query.nombre : '';
      const descripcion = query.descripcion ? query.descripcion : '';
      
      const data = await this.DeporteService.getDeportes(nombre);
      return {
        message: 'Peticion correcta',
        data: data,
      };
    }
  
    @Get(':id')
    getDeporte(@Param('id') id: string) {
      return this.DeporteService.getbyId(id);
    }
  
    @Post()
    createDeporte(@Body() dto: CreateDeporteDto) {
      return this.DeporteService.createDeporte(dto); 
    }

    @Post('many')
    createMany(@Body() dto: []) {
      return this.DeporteService.createMany(dto); 
    }
  
    @Put(':id')
    updateDeporte(@Body() dto: CreateDeporteDto, @Param('id') id) {
      return this.DeporteService.editDeporte(dto, id);
    }
  
    @Delete(':id')
    deleteDeporte(@Param('id') id) {
      return this.DeporteService.deleteDeporte(id);
    }

    
  }