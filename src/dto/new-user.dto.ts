import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewUserDto {
  @Field(() => String, { description: 'Nombre del usuario', nullable: true })
  name?: string;

  @Field(() => String, { description: 'Correo electrónico del usuario' })
  email: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  password: string;
}
