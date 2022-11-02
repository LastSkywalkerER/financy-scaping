import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MockAuthGuard } from './auth/guards/mock-auth.guard';
import { MockRolesGuard } from './roles/guards/mock-roles.guard';
import { RolesGuard } from './roles/guards/roles.guard';

export const getApp = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(JwtAuthGuard)
    .useClass(MockAuthGuard)
    .overrideProvider(RolesGuard)
    .useClass(MockRolesGuard)
    .compile();

  return module;
};

export const userFromToken = {
  user: {
    userName: 'Admin',
    email: 'maxdr1998@gmail.com',
    id: '1',
    role: 'user',
  },
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await getApp();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
