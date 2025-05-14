import { PartialType } from '@nestjs/swagger';

import { CreatePaymentServiceDto } from '@payment-services/dto/create-payment-service.dto';

export class UpdatePaymentServiceDto extends PartialType( CreatePaymentServiceDto ) {}
