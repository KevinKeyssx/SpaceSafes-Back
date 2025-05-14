import { PartialType } from '@nestjs/swagger';

import { BasicExpenseDto } from './basic-expense.dto';

export class UpdateExpenseDto extends PartialType( BasicExpenseDto ) {}
