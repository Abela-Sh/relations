import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Profile> {
    return this.profilesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async create(profile: Profile): Promise<Profile> {
    return this.profilesRepository.save(profile);
  }
}