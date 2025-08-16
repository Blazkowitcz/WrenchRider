import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('maintenances')
export class Maintenance {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: String })
	name: string;

	@Column({ type: String })
	description: string;

	@Column({ type: Number })
	time: number;

	@Column({ type: Number })
	distance: number;
}
