import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email already in use');
    }
    // hash the user pw
    const salt = randomBytes(8).toString('hex'); // generate salt
    const hash = (await scrypt(password, salt, 32)) as Buffer; // hash salt and pw
    const result = salt + '.' + hash.toString('hex'); // join hashed res and salt
    // create new user and save
    const user = await this.userService.create(email, result);
    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user does not exist!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid Password!');
    }

    return user;
  }
}
