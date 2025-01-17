import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './Dto/updateExpense.dto';
import { CreateExpenseDto } from './Dto/CreateExpense.Dto';

@Controller()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get('/')
  getUsers() {
    return this.expensesService.getAllExpense();
  }
  @Delete(':id')
  deleteUserById(@Param('id') id) {
    return this.expensesService.deleteExpenseById(+id);
  }
  @Put(':id')
  UpdateUserById(@Param('id') id, @Body() UpdateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.UpdateUserById(+id, UpdateExpenseDto);
  }
  @Get(':id')
  getUserById(@Param('id') id) {
    return this.expensesService.getExpenseById(+id);
  }
  @Post('/')
  createUser(@Body() CreateExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(CreateExpenseDto);
  }
}
