import { Injectable } from '@nestjs/common';
import { AppDataSource } from './app-data-source';
import { User } from './user.entity';
import { Post } from './post.entity';

@Injectable()
export class AppService {

  getUsers() {
    const users = AppDataSource
      .getRepository(User)
      .find()
  
    return users;
  }
  
  getPosts() {
    const posts = AppDataSource
      .getRepository(Post)
      .find()
  
    return posts;
  }
}
