import { Canal } from 'src/canal/entity/canal.entity';
import { Emision } from 'src/emision/entity/emision.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToOne} from 'typeorm';

@Entity('mon_programas')
export class Programapreview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;
  
  @Column({ type: 'varchar' })
  descripcion: string;

  @Column({ type: 'varchar' })
  logo?: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaEmision: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToOne(type => Canal, canal => canal.programas)
  canal?: Canal;

  @OneToMany(type => Emision, emision => emision.programa)
  emisiones?: Emision[];
}
