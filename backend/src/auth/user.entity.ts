import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true }) // ✅ FIXED
  username: string;

  @Column()
  password: string;
}