import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { ProfileModule } from './profiles/profiles.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'relations',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProfileModule,
  ],
})
export class AppModule {}
