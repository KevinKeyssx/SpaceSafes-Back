import { PartialType } from '@nestjs/swagger';

import { BasicPaymentServiceDto } from './basic-payment-service.dto';

export class UpdatePaymentServiceDto extends PartialType( BasicPaymentServiceDto ) {}
