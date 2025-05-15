import { ApiProperty } from '@nestjs/swagger';

import { 
    IsString, 
    IsNumber, 
    IsNotEmpty,
    IsPositive,
    IsUUID
} from 'class-validator';

export class BasicPaymentDetailDto {

    @ApiProperty({
        description: 'Monto del detalle de pago (debe ser positivo)',
        example: 50.75,
        minimum: 0.01
    })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({
        description: 'ID del balance relacionado (UUID)',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    balanceId: string;

    @ApiProperty({
        description: 'ID del servicio de pago relacionado (UUID)',
        example: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'
    })
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    paymentServiceId: string;

}