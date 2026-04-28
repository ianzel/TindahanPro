import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './products/product.entity';
import { Sale } from './sales/sale.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Credit } from './credits/credit.entity';

import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CreditsModule } from './credits/credits.module';

import { AuthModule } from './auth/auth.module'; // 🔥 ADD THIS

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tindahanpro_db',
      entities: [Product, Sale, Supplier, Credit],
      synchronize: true,
    }),

    AuthModule, // 🔥 ADD THIS

    ProductsModule,
    SalesModule,
    SuppliersModule,
    CreditsModule,
  ],
})
export class AppModule {}