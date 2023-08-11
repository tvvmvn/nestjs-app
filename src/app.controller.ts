import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get() 
  hello() {
    return "hello user"
  }
  
  @Get('/users')
  getUsers() {
    return this.appService.getUsers()
  }

  @Get('/posts')
  getPosts() {
    return this.appService.getPosts()
  }
}