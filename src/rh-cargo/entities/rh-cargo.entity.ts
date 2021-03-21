import { TarifaCargo } from '../../rh-tarifaxcargo/entities/rh-tarifaxcargo.entity';
import { Contrato } from '../../rh-contrato/entities/rh-contrato.entity';
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('rh_cargo')
export class Cargo {
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

  @OneToMany(type => TarifaCargo, tarifacargo => tarifacargo.cargo)
  tarifaxcargo?: TarifaCargo[];

  @OneToMany(type => Contrato, contrato => contrato.cargo)
  contratos?: Contrato[];
}
