import { ApiProperty } from "@nestjs/swagger";

import { IsDate, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Transform } from "class-transformer";


export class BalancePaymentDto {

    @ApiProperty({
        type: [String],
        description: 'Lista de IDs de balances',
        required: false,
        isArray: true
    })
    @IsUUID(undefined, { each: true })
    @IsOptional()
    balanceIds?: string[];

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
        type: Number,
        description: 'Monto',
        required: false
    })
    @IsNumber()
    @IsOptional()
    amount?: number;

}