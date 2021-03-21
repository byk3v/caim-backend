import { Provincia } from '../../rh-provincia/entities/rh-provincia.entity';
import { Persona } from '../../rh-persona/entities/rh-persona.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('rh_municipio')
export class Municipio {
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

  @ManyToOne(type => Provincia, provincia => provincia.municipios)
  provincia?: Provincia;

  @OneToMany(type => Persona, persona => persona.municipio)
  personas?: Persona[];
}
