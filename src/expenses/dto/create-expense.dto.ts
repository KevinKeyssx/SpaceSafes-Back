import { IntersectionType } from "@nestjs/swagger";

import { UserIdDto }        from "@common/dtos/user-id.dto";
import { BasicExpenseDto }  from "@expenses/dto/basic-expense.dto";


export class CreateExpenseDto extends IntersectionType(
    UserIdDto,
    BasicExpenseDto
) {}