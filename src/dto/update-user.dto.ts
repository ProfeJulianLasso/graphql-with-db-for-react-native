import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => String, { description: 'Nombre del usuario', nullable: true })
  name?: string;

  @Field(() => String, {
    description: 'Correo electrónico del usuario',
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    description: 'Contraseña del usuario',
    nullable: true,
  })
  password?: string;
}
