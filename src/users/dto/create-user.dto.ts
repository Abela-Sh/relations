import { Profile } from '../../profiles/entities/profile.entity';

export class CreateUserDto {
  username: string;
  email: string;
  profile: Profile;
}