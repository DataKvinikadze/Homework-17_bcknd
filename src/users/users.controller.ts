import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { UpdateUserDto } from './Dto/UpdateUser.Dto';
import { CreateUserDto } from './Dto/CreateUser.Dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getUsers();
  }
  @Delete(':id')
  deleteUserById(@Param('id') id) {
    return this.usersService.DeleteUserById(+id);
  }
  @Put(':id')
  UpdateUserById(@Param('id') id, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUserById(+id, UpdateUserDto);
  }
  @Get(':id')
  getUserById(@Param('id') id) {
    return this.usersService.getUserById(+id);
  }
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.CreateUser(createUserDto);
  }
}
