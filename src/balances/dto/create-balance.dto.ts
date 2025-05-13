import { IntersectionType } from '@nestjs/swagger';

import { UserIdDto }        from '@common/dtos/user-id.dto';
import { BasicBalanceDto }  from '@balances/dto/basic-balance.dto';


export class CreateBalanceDto  extends IntersectionType(
    BasicBalanceDto,
    UserIdDto
) {}
