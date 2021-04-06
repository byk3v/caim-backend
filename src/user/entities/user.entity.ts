import { Role } from '../../role/entities/role.entity';
import { Noticia} from '../../noticia/entity/noticia.entity'
import { Persona} from '../../rh-persona/entities/rh-persona.entity'
import { Indicacion } from '../../indicaciones/entities/indicaciones.entity'
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 8, default: 'ACTIVE' })
  status: string;

  @Column({ default: '' })
  refreshtoken: string;

  @Column({ default: '' })
  refreshtokenExpires: string;

  @ManyToMany((type) => Role, (rol) => rol.users)
  roles: Role[];

  @OneToMany(type => Noticia, noticia => noticia.usuario)
  noticias?: Noticia[];

  @ManyToOne(type => Persona, persona => persona.usuarios)  //id_monitoreador(usuario)
  persona?: Persona;

  @OneToMany(type => Indicacion, indica => indica.emisor)  //emisor de indicacion
  emisorindicacion?: Indicacion[];

  @OneToMany(type => Indicacion, indica => indica.receptor)  //receptor de indicacion
  receptorindicacion?: Indicacion[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
