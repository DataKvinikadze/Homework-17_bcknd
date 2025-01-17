import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './Dto/CreateExpense.Dto';
import { UpdateExpenseDto } from './Dto/updateExpense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'Food',
      productName: 'Pizza',
      quantity: 2,
      price: 15,
      totalPrice: 30,
    },
    {
      id: 2,
      category: 'Electronics',
      productName: 'Headphones',
      quantity: 3,
      price: 50,
      totalPrice: 150,
    },
    {
      id: 3,
      category: 'Books',
      productName: 'Programming Book',
      quantity: 2,
      price: 30,
      totalPrice: 60,
    },
  ];
  getAllExpense() {
    return this.expenses;
  }
  getExpenseById(id: Number) {
    const exist = this.expenses.find((el) => el.id == id);
    if (!exist) return new HttpException('No User Found with that id!', 404);
    return exist;
  }
  createExpense(createExpenseDto: CreateExpenseDto) {
    const { category, productName, price, quantity, totalPrice } =
      createExpenseDto;
    if (!category || !productName || !price || !quantity || !totalPrice)
      return new HttpException(
        'You must Enter All the Fields! category, productName, price, quantity, totalPrice',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId - 1,
      category,
      productName,
      price,
      quantity,
      totalPrice: quantity * price,
    };
    this.expenses.push(newExpense);
  }
  deleteExpenseById(id: Number) {
    const index = this.expenses.findIndex((el) => el.id == id);
    if (index == -1) return new HttpException('Cant Find Expense!', 404);
    const deletedUser = this.expenses.splice(index, 1);
    return deletedUser;
  }
  UpdateUserById(id: Number, updateExpenseDto: UpdateExpenseDto) {
    const user = this.expenses.find((el) => el.id == id);
    if (!user) return new HttpException('Cant Find User!', 404);
    const { category, productName, price, quantity, totalPrice } =
      updateExpenseDto;
    if (category) user.category = category;
    if (productName) user.productName = productName;
    if (price) user.price = price;
    if (quantity) user.quantity = quantity;
    user.totalPrice = quantity * price;
    return user;
  }
}
