import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  async create(user: User): Promise<User> {
    const profile = await this.profilesRepository.save(user.profile);
    user.profile = profile;
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.profile) {
      existingUser.profile = { ...existingUser.profile, ...updateUserDto.profile };
      await this.profilesRepository.save(existingUser.profile);
    }

    const updatedUser = { ...existingUser, ...updateUserDto };
    await this.usersRepository.save(updatedUser);
    return this.findOne(id);
  }


  async remove(id: number): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    await this.profilesRepository.remove(existingUser.profile);
    await this.usersRepository.remove(existingUser);
  }
}