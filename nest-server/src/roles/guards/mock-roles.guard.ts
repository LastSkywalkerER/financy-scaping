import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Users } from '@/users/entities/users.entity';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from '../types/roles.enum';

@Injectable()
export class MockRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { body, user } = context.switchToHttp().getRequest<{ body: { author: string }; user: Users }>();

    if (body.author && requiredRoles.includes(Roles.Owner)) {
      requiredRoles.splice(requiredRoles.indexOf(Roles.Owner), 1);

      return body.author === user.email;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
