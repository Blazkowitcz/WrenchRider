import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
export class Brand {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: String })
	name: string;

	@Column({ type: String })
	color: string;
}
