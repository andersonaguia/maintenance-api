import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/users/enum/user.role';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
