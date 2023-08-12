import {
  Controller,
  Get, Post, Put, Delete,
  Body, Query,
  HttpException, HttpStatus, 
  Param, ParseIntPipe, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ListAllEntities } from './dto/list-all-entities';
import { CatsService } from './cats.service';
import { Cat } from './interface/Cat';
import { RolesGuard } from 'src/common/roles.guard';
import { LoggingInterceptor } from 'src/common/logging.intercepter';

/*
Controllers

Controllers are responsible for handling incoming requests 
and returning responses to the client.

A controller's purpose is to receive specific requests for the application. 
The routing mechanism controls which controller receives which requests. 

Frequently, each controller has more than one route, 
and different routes can perform different actions.

In order to create a basic controller, we use classes and decorators. 
Decorators associate classes with required metadata 
and enable Nest to create a routing map 
(tie requests to the corresponding controllers).
*/

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  /*
  Exception filters

  Nest comes with a built-in exceptions layer which is responsible 
  for processing all unhandled exceptions across an application. 

  When an exception is not handled by your application code, 
  it is caught by this layer, which then automatically sends 
  an appropriate user-friendly response.
  */

  @Get()
  async findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    try {
      return this.catsService.findAll(query.limit);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      })
    }
  }

  /* 
  Pipes
  A pipe is a class annotated with the @Injectable() decorator, 
  which implements the PipeTransform interface.
  
  Pipes have two typical use cases:

  1 transformation
  transform input data to the desired form (e.g., from string to integer)
  
  2 validation
  evaluate input data and if valid, simply pass it through unchanged; 
  otherwise, throw an exception
  */

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param() id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

