import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Emision } from '../../emision/entity/emision.entity';
import { User } from '../../user/entities/user.entity'
import { Pais } from '../../pais/entities/pais.entity';
import { Territorio } from '../../territorio/entities/territorio.entity';
import { PoliticaInformativa } from '../../politicainformativa/entities/politicainformativa.entity';
import { GeneroPeriodistico } from '../../genero/entities/genero.entity';
import { ActoresEconomicos } from '../../actoreseconomicos/entities/actoreseconomico.entity';
import { EstadoNoticia } from '../../estadonoticia/entities/estadonoticia.entity';
import { Deporte } from '../../deporte/entities/deporte.entity';
import { ManifestacionArtistica } from '../../manifestacionartistica/entities/manifestacionartistica.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Periodista } from 'src/periodista/entities/periodista.entity';


@Entity('mon_noticia')
export class Noticia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  ideaCentral: string;
  
  @Column({ type: 'varchar' })
  valoracion?: string;

  @Column({ type: 'varchar' })
  tareaOrdenamiento?: string;
  
  @ManyToOne(type => Emision, emision => emision.noticias)
  emision?: Emision;

  @ManyToOne(type => GeneroPeriodistico, genero => genero.noticias)  //id_genero
  generoPeriodistico?: GeneroPeriodistico;
  
  @ManyToOne(type => Categoria, categoria => categoria.infos)  //Categoria-Pricipal
  categoriaPrincipal?: Categoria;
  
  @ManyToMany((type) => Categoria, (cat) => cat.noticias)  //Tags o categorias secundarias
  tags?: Categoria[];

  @ManyToOne(type => PoliticaInformativa, politicainformativa => politicainformativa.noticias)  //id_politicaInformativa
  politicaInformativa?: PoliticaInformativa;
    
  @ManyToOne(type => ActoresEconomicos, actoreconomico => actoreconomico.noticias)  //id_actoresEconomicos
  actoresEconomicos?: ActoresEconomicos;

  @ManyToOne(type => EstadoNoticia, estado => estado.noticias)  //id_estado (aprobada, denegada, en_revision)
  estado?: EstadoNoticia;
  
  @ManyToOne(type => User, user => user.noticias)  //id_monitoreador(usuario)
  usuario?: User;
  
  //---------------------------------------- SOLO RADIO y TV

  @ManyToOne(type => Territorio, territorio => territorio.noticias)  //id_territorio
  territorio?: Territorio;

  @ManyToOne(type => Pais, pais => pais.noticias)  //id_pais
  pais?: Pais;

  @ManyToOne(type => Periodista, periodista => periodista.noticias)  //id_periodista  
  periodista?: Periodista;

  @Column({ type: 'varchar' })
  entrevistados?: string;

  @Column({ type: 'varchar' })
  imagen?: string;

  @ManyToOne(type => Deporte, deporte => deporte.noticias)  //id_deporte
  deporte?: Deporte;

  @ManyToOne(type => ManifestacionArtistica, manifestacionartistica => manifestacionartistica.noticias)  //id_manifestacionArtistica
  manifestacionArtistica?: ManifestacionArtistica;
  
  

  //--------------------------------------- Para redes Sociales
  @Column({ type: 'varchar' })    
  enlace?: string;

  @Column({ type: 'varchar' })
  compartidas?: string;

  @Column({ type: 'varchar' })    
  comentarios?: string;

  @Column({ type: 'varchar' })
  interacciones?: string;

  @Column({ type: 'varchar' })
  total?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
}
