import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}


/*
Guards 

Guards have a single responsibility. 
They determine whether a given request will be handled 
by the route handler or not, depending on certain conditions 
(like permissions, roles, ACLs, etc.) present at run-time. 

This is often referred to as authorization. 
Authorization (and its cousin, authentication, 
with which it usually collaborates) has typically been handled 
by middleware in traditional Express applications. 

Middleware is a fine choice for authentication, 
since things like token validation and attaching properties 
to the request object are not strongly connected with 
a particular route context (and its metadata).


But middleware, by its nature, is dumb. 
It doesn't know which handler will be executed after 
calling the next() function. 

On the other hand, Guards have access to the ExecutionContext instance, 
and thus know exactly what's going to be executed next. 
They're designed, much like exception filters, pipes, and interceptors, 
to let you interpose processing logic at exactly the right point 
in the request/response cycle, and to do so declaratively. 
This helps keep your code DRY and declarative.
*/