import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('user', { schema: 'public' })
export class User {
  @Field(() => String, {
    description: 'Identificador único del usuario',
    name: 'id',
  })
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Field(() => String, {
    description: 'Nombre del usuario',
    name: 'name',
    nullable: true,
  })
  @Column('character varying', { name: 'name', length: 255, nullable: true })
  name?: string;

  @Field(() => String, {
    description: 'Correo electrónico del usuario',
    name: 'email',
  })
  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Field(() => String, {
    description: 'Contraseña del usuario',
    name: 'password',
  })
  @Column('character varying', { name: 'password', length: 128 })
  password: string;
}
