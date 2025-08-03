import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Maintenance } from '../maintenance/maintenance.entity';
import { UserBike } from '../user-bike/user-bike.entity';

@Entity('userBikes')
export class UserBikeMaintenance {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserBike, { nullable: false })
	userBike: UserBike;

	@ManyToOne(() => Maintenance, { nullable: false })
	maintenance: Maintenance;

	@Column({ type: Date })
	date: Date;

	@Column({ type: 'text' })
	description: String;
}
