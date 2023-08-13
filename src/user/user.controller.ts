import { 
  Controller, 
  Req, Body, 
  Get, Post, Put,
  UsePipes, ValidationPipe, 
  UseGuards,
  UseInterceptors, 
  UploadedFile,
  HttpException, HttpStatus, UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Controller('user')
@UsePipes(new ValidationPipe()) // Controller level
export class UserController {
  constructor (private jwtService: JwtService) {}
  
  @Get() 
  hello() {
    return 'hello user'
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return { createUserDto }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = {
      id: 1,
      email: 'bunny@example.com',
      password: '123',
      username: 'bunny',
    }

    if (email !== user.email) {
      // Pass to built-in exceptions layer
      throw new UnauthorizedException()
    }

    if (password !== user.password) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username };


    return { 
      access_token: await this.jwtService.signAsync(payload, jwtConstants),
    }
  }

  @Put() // User decorator is not required. you can access user via req.user
  @UseGuards(AuthGuard) // Router-level auth
  update(@User('sub') id: number, @Body() updateUserDto: UpdateUserDto) {
    return { id, updateUserDto }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file; // req.file
  }
}
