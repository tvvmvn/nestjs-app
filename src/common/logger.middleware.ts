import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/* 
Middleware is a function which is called before the route handler. 

Middleware functions have access to the request and response objects, 
and the next() middleware function in the application’s request-response cycle. 
The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:
- execute any code.
- make changes to the request and the response objects.
- end the request-response cycle.
- call the next middleware function in the stack.
- if the current middleware function does not end the request-response cycle, 
it must call next() to pass control to the next middleware function. 
Otherwise, the request will be left hanging.
*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}