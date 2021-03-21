import { Noticia } from '../../noticia/entity/noticia.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('mon_noticia_territorio')
export class Territorio {
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

  @OneToMany(type => Noticia, noticia => noticia.territorio)
  noticias?: Noticia[];
}
