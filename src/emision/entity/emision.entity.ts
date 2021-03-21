import { Canal } from 'src/canal/entity/canal.entity';
import { Noticia } from 'src/noticia/entity/noticia.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToOne} from 'typeorm';

@Entity('mon_emision')
export class Emision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;
  
  @Column({ type: 'varchar' })
  logo: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaEmision: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToOne(type => Canal, canal => canal.emisiones)
  canal?: Canal;

  @OneToMany(type => Noticia, noticia => noticia.emision)
  noticias?: Noticia[];
}
