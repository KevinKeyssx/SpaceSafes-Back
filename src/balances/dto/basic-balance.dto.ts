import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsNumber,
    IsOptional,
    Min,
    MaxLength,
    Length,
    Matches,
    IsDate
} from 'class-validator';

import {
    TypeBalance,
    TypeCard,
    TypeBalanceValues,
    TypeCardValues
} from '../enums/balance.enum';
import { Transform } from 'class-transformer';


export class BasicBalanceDto {

    @ApiProperty({
        description: 'Nombre del balance/cuenta',
        example: 'Cuenta Principal',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Tipo de balance',
        enum: TypeBalanceValues,
        example: TypeBalance.CREDIT,
        required: true
    })
    @IsEnum(TypeBalance)
    type: TypeBalance;

    @ApiPropertyOptional({
        description: 'Tipo de tarjeta (solo requerido si type es CREDIT/DEBIT)',
        enum: TypeCardValues,
        example: TypeCard.VISA,
        required: false
    })
    @IsOptional()
    @IsEnum(TypeCard)
    typeCard?: TypeCard;

    @ApiProperty({
        description: 'Balance actual',
        example: 1000.50,
        required: true
    })
    @IsNumber()
    @Min(0)
    balance: number;

    @ApiPropertyOptional({
        description: 'Número de tarjeta (formateado sin espacios)',
        example: '4111111111111111',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length(12, 19)
    @Matches(/^[0-9]+$/, { message: 'El número de tarjeta solo debe contener dígitos' })
    cardNumber?: string;

    @ApiPropertyOptional({
        description: 'Número de cuenta bancaria',
        example: '1234567890',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    accountNumber?: string;

    @ApiPropertyOptional({
        description: 'Nombre del banco',
        example: 'Banco Nacional',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    bankName?: string;

    @ApiPropertyOptional({
        description: 'Fecha de expiración (ISO string)',
        example: '2025-12-31',
        required: false
    })
    @IsOptional()
    @IsDate()
	@Transform(({ value }) => new Date(value))
    expirationDate?: Date;

    @ApiPropertyOptional({
        description: 'Código de verificación (CVV/CVC)',
        example: '123',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length(3, 4)
    @Matches(/^[0-9]+$/, { message: 'El código de verificación solo debe contener dígitos' })
    verificationNumber?: string;

    @ApiPropertyOptional({
        description: 'Fecha del último pago (ISO string)',
        example: '2023-10-15',
        required: false
    })
    @IsOptional()
    @IsDate()
	@Transform(({ value }) => new Date(value))
    lastPayment?: Date;
}