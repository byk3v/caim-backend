import { User } from '../../user/entities/user.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Municipio } from 'src/rh-municipio/entities/rh-municipio.entity';
import { Contrato } from 'src/rh-contrato/entities/rh-contrato.entity';

@Entity('rh_persona')
export class Persona {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    ci: string;
  
    @Column({ type: 'varchar', length: 60, nullable: false })
    nombre: string;
  
    @Column({ type: 'varchar', length: 30, nullable: false })
    primerApellido: string;
  
    @Column({ type: 'varchar', length: 30, nullable: false })
    segundoApellido: string;
  
    @Column({ type: 'timestamp', nullable: false })
    fechaNacimiento: Date;
  
    @Column({ type: 'varchar', length: 15 })
    telefCelular: string;
  
    @Column({ type: 'varchar', length: 15 })
    telefFijo: string;
  
    @Column({ type: 'varchar', length: 30 })
    email: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    direccion: string;
  
    @Column({ type: 'varchar', length: 15 })
    sexo: string;
  
    @Column({ type: 'boolean' })
    activo: boolean;

    @Column({ type: 'varchar', length: 100 })
    foto: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    modifiedAt: Date;

  @OneToMany(type => User, usuario => usuario.persona)
  usuarios?: User[];

  @ManyToOne(type => Municipio, municipio => municipio.personas)  //id_mounicipio
  municipio?: Municipio;

  @OneToMany(type => Contrato, contrato => contrato.persona)
  contratos?: Contrato[];

}
