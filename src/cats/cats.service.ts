import { Injectable } from '@nestjs/common';
import { Cat } from './interface/Cat';

/*
  Provider

  Providers are a fundamental concept in Nest. 
  Many of the basic Nest classes may be treated as a provider – 
  services, repositories, factories, helpers, and so on. 

  The main idea of a provider is that it can be injected as a dependency
  this means objects can create various relationships with each other,
   
  and the function of "wiring up" instances of objects can largely be delegated 
  to the Nest runtime system.
*/

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(limit: string): Cat[] {
    return this.cats;
  }
}
