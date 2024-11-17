import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5050,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
