import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'node:crypto';
import { NewUserDto } from 'src/dto/new-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { RepositoryService } from 'src/services/repository/repository.service';

@Resolver()
export class BackendResolver {
  constructor(private readonly repository: RepositoryService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }

  @Query(() => User, {
    name: 'getUser',
    description: 'Obtener un usuario',
  })
  getUser(
    @Args('id', { description: 'ID del usuario' }) id: string,
  ): Promise<User> {
    return this.repository.getUser(id);
  }

  @Query(() => [User], {
    name: 'getAllUsers',
    description: 'Obtener todos los usuarios',
  })
  getAllUsers(): Promise<User[]> {
    return this.repository.getUsers();
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Crear un usuario',
  })
  createUser(@Args('user') user: NewUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = crypto
      .createHash('sha512')
      .update(user.password)
      .digest('hex');
    return this.repository.createUser(newUser);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Actualizar un usuario',
  })
  updateUser(
    @Args('id', { description: 'ID del usuario' }) id: string,
    @Args('user') user: UpdateUserDto,
  ): Promise<User> {
    const updateUser = new User();
    if (user.name) updateUser.name = user.name;
    if (user.email) updateUser.email = user.email;
    if (user.password)
      updateUser.password = crypto
        .createHash('sha512')
        .update(user.password)
        .digest('hex');
    return this.repository.updateUser(id, updateUser);
  }

  @Mutation(() => Boolean, {
    name: 'deleteUser',
    description: 'Eliminar un usuario',
  })
  deleteUser(
    @Args('id', { description: 'ID del usuario' }) id: string,
  ): Promise<boolean> {
    return this.repository.deleteUser(id);
  }
}
