import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: String })
	firstName: string;

	@Column({ type: String })
	lastName: string;

	@Column({ type: String, unique: true })
	email: string;

	@Column({ type: String })
	password: string;

	@Column({ type: 'boolean', default: false })
	isAdmin: boolean;
}

export interface UserRequest extends Request {
	user: { id: string; isAdmin: boolean };
}
