import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Profile } from '../../profiles/entities/profile.entity';
export class UpdateUserDto {
    username?: string;
    email?: string;
    profile?: Partial<Profile>;
}