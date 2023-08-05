import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GithubAccessMiddleware implements NestMiddleware {
  private requestEmail: string;

  // used for getting google email to identify user
  use(req: Request, res: Response, next: NextFunction) {
    if (req.query && req.query.email) {
      this.requestEmail = String(req.query.email);
    } else if (req.query && req.query.code) {
      req.query.email = this.requestEmail;
    }
    next();
  }
}
