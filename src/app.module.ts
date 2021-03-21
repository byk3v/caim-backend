import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { CanalModule } from './canal/canal.module';
import { MedioModule } from './medio/medio.module';
import { EmisionModule } from './emision/emision.module';
import { NoticiaModule } from './noticia/noticia.module';
import { TerritorioModule } from './territorio/territorio.module';
import { PaisModule } from './pais/pais.module';
import { CategoriaModule } from './categoria/categoria.module';
import { PoliticainformativaModule } from './politicainformativa/politicainformativa.module';
import { ActoreseconomicosModule } from './actoreseconomicos/actoreseconomicos.module';
import { GeneroModule } from './genero/genero.module';
import { EstadonoticiaModule } from './estadonoticia/estadonoticia.module';
import { DeporteModule } from './deporte/deporte.module';
import { ManifestacionartisticaModule } from './manifestacionartistica/manifestacionartistica.module';
import { RhPersonaModule } from './rh-persona/rh-persona.module';
import { RhMunicipioModule } from './rh-municipio/rh-municipio.module';
import { RhProvinciaModule } from './rh-provincia/rh-provincia.module';
import { RhContratoModule } from './rh-contrato/rh-contrato.module';
import { RhCargoModule } from './rh-cargo/rh-cargo.module';
import { RhTarifaxcargoModule } from './rh-tarifaxcargo/rh-tarifaxcargo.module';
import { RhTipocontratoModule } from './rh-tipocontrato/rh-tipocontrato.module';

let connectionOptions;
let optionsSQL;

connectionOptions = {
  type: 'postgres',
  entities: [__dirname + './**/**/*entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  extra: {
    ssl: true,
  },
};
/*if (process.env.DATABASE_URL) {
  Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
} else {
  connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'aba-bd',
    autoLoadEntities: true,
    synchronize: true,
  };
}*/

optionsSQL = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'caim-bd',
  entities: [__dirname + './**/**/*entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    CanalModule,
    MedioModule,
    EmisionModule,
    NoticiaModule,
    TypeOrmModule.forRoot(optionsSQL),
    TerritorioModule,
    PaisModule,
    CategoriaModule,
    PoliticainformativaModule,
    ActoreseconomicosModule,
    GeneroModule,
    EstadonoticiaModule,
    DeporteModule,
    ManifestacionartisticaModule,
    RhPersonaModule,
    RhMunicipioModule,
    RhProvinciaModule,
    RhContratoModule,
    RhCargoModule,
    RhTarifaxcargoModule,
    RhTipocontratoModule,
    
     //connectionOptions o optionsSQL
    ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
