import { PartialType } from '@nestjs/swagger';

import { BasicServiceDto } from '@services/dto/basic-service.dto';

export class UpdateServiceDto extends PartialType( BasicServiceDto ) {}
