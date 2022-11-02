import { TestingModule } from '@nestjs/testing';

import { getApp, userFromToken } from '@/app.controller.spec';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('existing user should be validated', async () => {
    const user = await service.validateUser('maxdr1998@gmail.com', '1234');

    expect(user).toStrictEqual({ ...userFromToken.user, id: Number(userFromToken.user.id) });
  });
});
