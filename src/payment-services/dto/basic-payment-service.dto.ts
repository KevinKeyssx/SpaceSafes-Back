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
    Length,
    IsNotEmpty
} from 'class-validator';  


export class BasicPaymentServiceDto {

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
    @IsNotEmpty()
    serviceId: string;


    @ApiPropertyOptional({
        description: 'ID del Navly relacionado (UUID)',
        example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        nullable: true
    })
    @IsOptional()
    @IsString()
    @IsUUID()
    navlyId?: string | null;

}