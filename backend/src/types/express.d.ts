import { User } from 'src/users/user.entity';

declare module 'express' {
  interface Request {
    user?: User; // Tell TS that Request has optional 'user' property of type User
  }
}
