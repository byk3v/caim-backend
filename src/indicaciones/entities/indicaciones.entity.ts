import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity'
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable} from 'typeorm';

@Entity('gestion_indicacion')
export class Indicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  texto: string;

  @Column({ type: 'varchar', nullable: false })
  activa: string;

  @ManyToOne(type => User, emisor => emisor.emisorindicacion)  //id_del que la emite
  emisor?: User;

  @ManyToOne(type => User, receptor => receptor.receptorindicacion)  //id_del que la emite
  receptor?: User;

  @ManyToOne(type => Role, rol => rol.rolindicacion)  //id_del que la emite
  rol?: Role;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

}
