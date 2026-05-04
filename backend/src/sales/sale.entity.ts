import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  productName!: string;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitCost!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  profit!: number;

  @CreateDateColumn()
  created_at!: Date;
}