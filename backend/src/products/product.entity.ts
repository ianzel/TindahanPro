import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  buyingPrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  sellingPrice!: number;

  @Column()
  stock!: number;

  @Column()
  minStock!: number;

  @CreateDateColumn()
  created_at!: Date;
}