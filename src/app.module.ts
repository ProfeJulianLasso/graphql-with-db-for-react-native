import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { User } from './entities/user.entity';
import { BackendResolver } from './resolvers/backend/backend.resolver';
import { RepositoryService } from './services/repository/repository.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'graphql', 'schema.gql'),
      sortSchema: true,
    }),
    // Ejecutar en la base de datos
    // CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'pruebas',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [BackendResolver, RepositoryService],
})
export class AppModule {}
