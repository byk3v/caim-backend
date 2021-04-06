import { User } from '../../user/entities/user.entity';
import { Indicacion } from '../../indicaciones/entities/indicaciones.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  description: string;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinTable({ name: 'user_roles' })
  users: User[];

  @OneToMany(type => Indicacion, indica => indica.rol)  //receptor de indicacion
  rolindicacion?: Indicacion[];

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
