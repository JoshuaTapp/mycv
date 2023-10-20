import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import exp from 'constants';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'password' } as User,
        ]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id: id,
          email: 'test@test.com',
          password: 'password',
        } as User);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findUser() returns  user with a given 'id'", async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it("findUser() throws error if user with a given 'id' is not found", async () => {
    fakeUsersService.findOne = () => null;

    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findAllUsers() returns list of users with a given email', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('signin() updates session object and return user', async () => {
    const session = { userID: -1 };
    const user = await controller.signin(
      { email: 'test@testy.com', password: 'password1' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userID).toEqual(1);
  });

  it('createUser() returns user and sets session object', async () => {
    const session = { userID: -1 };
    const user = await controller.createUser(
      { email: 'test@test.com', password: 'password' },
      session,
    );
    expect(user).toBeDefined();
    expect(user.email).toEqual('test@test.com');
    expect(session.userID).toEqual(1);
  });
});
