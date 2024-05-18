import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findOne(+id);
  }

  @Post()
  create(@Body() profile: Profile): Promise<Profile> {
    return this.profileService.create(profile);
  }
}
