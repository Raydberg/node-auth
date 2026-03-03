import type { UserEntity } from '@domain/entities/user.entity';

declare global {
    namespace Express {
        interface Locals {
            user?: UserEntity;
        }
    }
}

export { };
