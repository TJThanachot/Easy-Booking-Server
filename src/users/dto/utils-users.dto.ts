export class LoginDto {
  email: string;
  password: string;
  roleId: number;
  id: string;
}

export class ProfileDto {
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly nationality: string;
  readonly role: number;
}

export class GoogleDto {
  readonly email: string;
  readonly name: string;
  readonly googleId: string;
  created_at: Date;
  updated_at: Date;
  password: string;
  role: number;
  constructor(email: string, name: string, googleId: string) {
    this.email = email;
    this.name = name;
    this.googleId = googleId;
    this.password = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.role = 1;
  }
}
