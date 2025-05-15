import { IntersectionType } from "@nestjs/swagger";

import { BasicPaymentServiceDto } from "./basic-payment-service.dto";
import { UserIdDto } from "@common/dtos/user-id.dto";

export class CreatePaymentServiceDto extends IntersectionType(
    BasicPaymentServiceDto,
    UserIdDto,
) {}
