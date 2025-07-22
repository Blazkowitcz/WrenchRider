import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Bike } from '../bike/bike.entity';

@Entity('userBikes')
export class UserBike {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, { nullable: false })
	user: User;

	@ManyToOne(() => Bike, { nullable: false })
	bike: Bike;

	@Column({ type: String })
	licence: string;

	@Column({ type: Number })
	mileage: number;
}
