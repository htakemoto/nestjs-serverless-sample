import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Hello World!',
      environments: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      }
    };
  }
}
