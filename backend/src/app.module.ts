import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './products/product.entity';
import { Sale } from './sales/sale.entity';
import { User } from './auth/user.entity';

import { ProductsModule } from './products/products.module'; // ✅ ADD THIS
import { SalesModule } from './sales/sales.module'; // (if you have)
import { AuthModule } from './auth/auth.module'; // (if you have)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tindahanpro_db',
      entities: [Product, Sale, User],
      synchronize: true,
    }),

    ProductsModule, // ✅ VERY IMPORTANT
    SalesModule,
    AuthModule,
  ],
})
export class AppModule {}