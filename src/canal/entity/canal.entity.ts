import { Emision } from 'src/emision/entity/emision.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Medio} from '../../medio/entity/medios.entity';

@Entity('mon_canal')
export class Canal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;
  
  @Column({ type: 'varchar' })
  logo: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToOne(type => Medio, medio => medio.canales)
  medio?: Medio;

  @OneToMany(type => Emision, emision => emision.canal)
  emisiones?: Emision[];
}
