import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUser() {
    return {
      id: 1,
      name: "Alex",
    };
  }
}
