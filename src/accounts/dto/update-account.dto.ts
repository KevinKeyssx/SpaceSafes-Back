import { PartialType } from '@nestjs/swagger';

import { BasicAccountDto } from './basic-account.dto';

export class UpdateAccountDto extends PartialType( BasicAccountDto ) {}
