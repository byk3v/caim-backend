import { Persona } from '../../rh-persona/entities/rh-persona.entity';
import { Cargo } from '../../rh-cargo/entities/rh-cargo.entity';
import { TipoContrato } from '../../rh-tipocontrato/entities/rh-tipocontrato.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('rh_contrato')
export class Contrato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  duracion: string;

  @Column({ type: 'boolean' })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;

  @ManyToOne(type => Persona, persona => persona.contratos)
  persona?: Persona;

  @ManyToOne(type => Cargo, cargo => cargo.contratos)
  cargo?: Cargo;
  
  @ManyToOne(type => TipoContrato, tipocontrato => tipocontrato.contratos)
  tipocontrato?: Cargo;
   
}
