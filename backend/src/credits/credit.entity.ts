import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('credits')
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column('decimal')
  amount: number;

  @Column()
  dueDate: string;
}