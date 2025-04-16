// import { DataSource } from 'typeorm';
// import { Global, Logger, Module } from '@nestjs/common';

// const logger = new Logger('TypeORMModule');

// @Global()
// @Module({
//   imports: [],
//   providers: [
//     {
//       provide: DataSource,
//       useFactory: async () => {
//         const dataSource = new DataSource({
//           type: 'mysql',
//           host: 'localhost',
//           port: 3306,
//           username: 'root',
//           password: 'Password@123',
//           database: 'spotify',
//           synchronize: true,
//           entities: ['dist/src/modules/*/entities/*.entity{.ts,.js}'],
//           logging: true, // Enable query logging
//         });

//         try {
//           await dataSource.initialize();
//           logger.log('Database connected successfully');
//           return dataSource;
//         } catch (error) {
//           logger.error('Error connecting to database', error);
//           throw error;
//         }
//       },
//     },
//   ],
//   exports: [DataSource],
// })
// export class TypeOrmModule {}

import { DataSource } from 'typeorm';
import { Global, Logger, Module } from '@nestjs/common';

const logger = new Logger('TypeORMModule');

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Password@123',
          database: 'spotify',
          synchronize: true,
          entities: [
            __dirname + '/../modules/**/*.entity{.ts,.js}',
            __dirname + '/../modules/**/entities/*.entity{.ts,.js}',
          ],
          // logging: true,
        });

        try {
          await dataSource.initialize();
          logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
