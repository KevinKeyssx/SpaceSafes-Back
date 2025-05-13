import { PartialType } from '@nestjs/swagger';
import { BasicBalanceDto } from './basic-balance.dto';

export class UpdateBalanceDto extends PartialType( BasicBalanceDto ) {}
