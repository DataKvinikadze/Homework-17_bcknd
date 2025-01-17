import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/CreateUser.Dto';
import { UpdateUserDto } from './Dto/UpdateUser.Dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '987-654-3210',
      gender: 'Female',
    },
  ];

  getUsers() {
    return this.users;
  }
  getUserById(id: Number) {
    const exist = this.users.find((el) => el.id == id);
    if (!exist) return new HttpException('No User Found with that id!', 404);
    return exist;
  }
  CreateUser(CreateUserDto: CreateUserDto) {
    const { firstName, lastName, email, phoneNumber, gender } = CreateUserDto;
    if (!firstName || !lastName || !email || !phoneNumber || !gender)
      return new HttpException(
        'You must enter all the fields!',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId - 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
    return newUser;
  }
  DeleteUserById(id: Number) {
    const index = this.users.findIndex((el) => el.id == id);
    if (index == -1) return new HttpException('Cant Find User!', 404);
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }
  UpdateUserById(id: Number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((el) => el.id == id);
    if (!user) return new HttpException('Cant Find User!', 404);
    const { firstName, lastName, email, phoneNumber, gender } = updateUserDto;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (gender) user.gender = gender;
    return user;
  }
}
