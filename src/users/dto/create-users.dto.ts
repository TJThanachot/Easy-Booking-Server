import { Users } from '../entities/user.entity';
export class CreateUsersDto {
  readonly id: string;
  readonly username: string;
  password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly nationality: string;
  readonly role: number;
  createdAt: Date;
  updatedAt: Date;

  // constructor(entity: Users) {
  //   this.id = entity.id;
  //   this.username = entity.username;
  //   this.password = entity.password;
  //   this.firstName = entity.firstName;
  //   this.lastName = entity.lastName;
  //   this.phoneNumber = entity.phoneNumber;
  //   this.email = entity.email;
  //   this.nationality = entity.nationality;
  //   this.role = entity.role;
  //   this.createdAt = entity.createdAt;
  //   this.updatedAt = entity.updatedAt;
  // }
}
