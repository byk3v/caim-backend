import { Noticia } from '../../noticia/entity/noticia.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm';

@Entity('mon_periodista')
export class Periodista {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;
  
  @Column({ type: 'varchar' })
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToMany(type => Noticia, (noticia) => noticia.periodistas)
  @JoinTable({ name: 'mon_noticias_periodistas' })
  noticias?: Noticia[];

}
