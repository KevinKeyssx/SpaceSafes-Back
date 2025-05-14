import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { 
    IsString, 
    IsNumber, 
    IsOptional, 
    IsUUID,
    IsPositive,
    MaxLength,
    IsDate,
    Length
} from 'class-validator';  


export class BasicPaymentServiceDto {

    @ApiProperty({
        description: 'Nombre del servicio de pago',
        example: 'Pago de internet',
        minLength: 3,
        maxLength: 100
    })
    @IsString()
    @Length(3, 100)
    name: string;

    @ApiProperty({
        description: 'Monto del pago',
        example: 99.99,
        minimum: 0.01
    })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiPropertyOptional({
        description: 'Fecha de expiración del pago (ISO string)',
        example: '2024-12-31T23:59:59.999Z',
        nullable: true
    })
    @IsOptional()
    @IsDate()
	@Transform(({ value }) => new Date( value ))
    expirationDate?: Date;

    @ApiPropertyOptional({
        description: 'Descripción adicional del pago',
        example: 'Pago mensual de servicio de internet',
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @ApiProperty({
        description: 'ID del servicio asociado',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    })
    @IsUUID()
    serviceId: string;

    @ApiPropertyOptional({
        description: 'ID del balance asociado',
        example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        nullable: true
    })
    @IsOptional()
    @IsUUID()
    balanceId?: string;

    @ApiPropertyOptional({
        description: 'ID del balance Navly asociado',
        example: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        nullable: true
    })
    @IsOptional()
    @IsUUID()
    navlyBalanceId?: string;

}