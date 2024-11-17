import { GetUserDto } from '../dto/get-user.dto';
import { User } from '../entities/user.entity';

export const mapUserToGetUserDto = (user: User): GetUserDto => {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
