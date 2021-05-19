import { Noticia } from '../../noticia/entity/noticia.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable} from 'typeorm';

@Entity('mon_categoria')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  codigo: string;
  
  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ length: 700 })
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToMany((type) => Noticia, (noticia) => noticia.tags)
  @JoinTable({ name: 'mon_noticias_tags' })
  noticias: Noticia[];

  @OneToMany(type => Noticia, noti => noti.categoriaPrincipal)
  infos?: Noticia[];
}
