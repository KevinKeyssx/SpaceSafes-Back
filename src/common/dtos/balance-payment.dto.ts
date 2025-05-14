import { ApiProperty } from "@nestjs/swagger";

import { IsDate, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Transform } from "class-transformer";


export class BalancePaymentDto {

    @ApiProperty({
        type: String,
        description: 'ID de la balance',
        required: false
    })
    @IsUUID()
    @IsOptional()
    balanceId?: string;

    @ApiProperty({
        type: Date,
        description: 'Fecha de expiración',
        required: false
    })
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => new Date( value ))
    expirationDate?: Date;


    @ApiProperty({
        type: Date,
        description: 'Fecha de expiración del pago',
        required: false
    })
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => new Date( value ))
    expirationDatePayment?: Date;


    @ApiProperty({
        type: Number,
        description: 'Monto',
        required: false
    })
    @IsNumber()
    @IsOptional()
    amount?: number;
    
}