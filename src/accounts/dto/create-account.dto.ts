import { IntersectionType } from '@nestjs/swagger';

import { BasicAccountDto } from './basic-account.dto';
import { UserIdDto } from '@common/dtos/user-id.dto';


export class CreateAccountDto extends IntersectionType(
    BasicAccountDto,
    UserIdDto
) {}

