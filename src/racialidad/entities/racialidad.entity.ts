import { Noticia } from '../../noticia/entity/noticia.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity('mon_racialidad')
export class Racialidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar' })
  whitejournalist: string;

  @Column({ type: 'varchar' })
  blackjournalist: string;

  @Column({ type: 'varchar' })
  halfbloodjournalist: string;

  @Column({ type: 'varchar' })
  whiteguest: string;

  @Column({ type: 'varchar' })
  blackguest: string;

  @Column({ type: 'varchar' })
  halfbloodguest: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @OneToMany(type => Noticia, noticia => noticia.racialidad)
  noticias?: Noticia[];
}
