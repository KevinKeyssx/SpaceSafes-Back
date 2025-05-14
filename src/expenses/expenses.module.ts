import { Module } from '@nestjs/common';

import { ExpensesService }      from '@expenses/expenses.service';
import { ExpensesController }   from '@expenses/expenses.controller';

@Module({
    controllers: [ExpensesController],
    providers: [ExpensesService],
})
export class ExpensesModule {}
