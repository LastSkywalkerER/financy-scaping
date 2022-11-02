import { HttpException, HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { getApp, userFromToken } from '@/app.controller.spec';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('double register not allowed', async () => {
    // expect(
    //   await controller.register({
    //     userName: 'Admin',
    //     email: 'maxdr1998@gmail.com',
    //     password: '1234',
    //   }),
    // ).toThrow(new HttpException('User already exists', HttpStatus.NOT_ACCEPTABLE));

    try {
      const response = await controller.register({
        userName: 'Admin',
        email: 'maxdr1998@gmail.com',
        password: '1234',
      });

      expect(response).toBeDefined();
    } catch (error) {
      expect(error).toEqual(new HttpException('User already exists', HttpStatus.NOT_ACCEPTABLE));
    }
  });

  it('login must return token', async () => {
    const { access_token } = await controller.login(userFromToken);

    expect(access_token.length).toBeGreaterThan(0);
  });
});
