import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';

@Global() 
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource, 
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'usesblogs',
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`], 
          });
          await dataSource.initialize(); 
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}