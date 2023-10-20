import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    // create a fake copy of users service
    // this prevents the UsersService from calling repo/db
    // and just returns the create line
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    // Creating a testing DI container for testing AuthService
    // need to in order to handle DI for AuthService (depends on UsersService)
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService, // <- replace this
          useValue: fakeUsersService, // <-  with this instead
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'password');

    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('it throws error if user signs up with email already in use', async () => {
    await service.signup('test@test.com', 'password');
    await expect(service.signup('test@test.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@test.com', 'password')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws BadRequestException if invalid password is provided', async () => {
    await service.signup('test@test.com', 'password');

    await expect(
      service.signin('test@test.com', 'badPassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'password');

    const user = await service.signin('test@test.com', 'password');

    expect(user).toBeDefined();
  });
});
