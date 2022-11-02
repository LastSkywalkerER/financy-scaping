import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

import { Users } from '@/users/entities/users.entity';

dotenv.config();

export const testDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL_TEST,
  synchronize: true,
  logging: false,
  entities: [Users],
};
