import { IntersectionType } from '@nestjs/swagger';

import { BasicAccountDto }      from './basic-account.dto';
import { UserIdDto }            from '@common/dtos/user-id.dto';
import { BalancePaymentDto }    from '@common/dtos/balance-payment.dto';


export class CreateAccountDto extends IntersectionType(
    BasicAccountDto,
    UserIdDto,
    BalancePaymentDto
) {}

