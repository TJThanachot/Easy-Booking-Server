import { Users } from '../entities/user.entity';
export class CreateUsersDto {
  id: string;
  password: string;
  name: string;
  phone_number: string;
  email: string;
  nationality: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;

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
