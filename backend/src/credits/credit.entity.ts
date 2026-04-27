import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('credits')
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  dueDate: string;

  @Column({ default: false })
  isPaid: boolean;

  @CreateDateColumn()
  created_at: Date;
}