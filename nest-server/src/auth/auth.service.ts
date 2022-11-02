import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { GetUserDto } from '@/users/dto/get-user.dto';

import { UsersService } from '../users/users.service';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<GetUserDto | null> {
    const user = await this.usersService.getOne(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: GetUserDto) {
    return {
      access_token: this.jwtService.sign(user, { secret: process.env.JWT_SECRET }),
    };
  }
}
