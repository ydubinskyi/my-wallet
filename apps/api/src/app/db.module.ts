import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `wallet-db.sqlite`,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
