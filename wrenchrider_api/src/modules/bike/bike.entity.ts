import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from '../brand/brand.entity'

@Entity('bikes')
export class Bike {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Brand)
    brand: Brand;

    @Column({ type: String })
    name: string;

    @Column({ type: Number })
    power: number;

    @Column({ type: Number })
    year: number;
}
