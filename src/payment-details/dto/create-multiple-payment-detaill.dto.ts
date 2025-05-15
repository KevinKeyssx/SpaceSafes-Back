import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import {
    ArrayMinSize,
    IsArray,
    ValidateNested
}               from "class-validator";
import { Type } from "class-transformer";

import { UserIdDto }                from "@common/dtos/user-id.dto";
import { BasicPaymentDto }          from "@payment-details/dto/basic-payment.dto";
import { BasicPaymentDetailDto }    from "@payment-details/dto/basic-payment-detail.dto";


export class CreateMultiplePaymentDetailDto extends IntersectionType(
    BasicPaymentDto,
    UserIdDto,
) {

    @ApiProperty({
        description: 'Lista de pagos',
        type: [BasicPaymentDetailDto],
        example: [
            {
                "amount": 50.75,
                "balanceId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
                "paymentServiceId": "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
            },
            {
                "amount": 50.75,
                "balanceId": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
                "paymentServiceId": "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
            }
        ],
    })
    @IsArray()
    @ArrayMinSize(1, { message: 'Debe haber al menos un detalle de pago' })
    @ValidateNested({ each: true })
    @Type(() => BasicPaymentDetailDto)
    paymentDetails: BasicPaymentDetailDto[];

}
