import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const data = await this.userRepository.findOneBy({ id });
    if (data) return data;
    throw new Error('User not found');
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUser(id: string, user: User): Promise<User> {
    const updateUser = await this.getUser(id);
    return this.userRepository.save({ ...updateUser, ...user });
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return Promise.resolve(true);
  }
}
