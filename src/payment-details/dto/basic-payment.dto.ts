import { ApiProperty } from '@nestjs/swagger';

import { IsInt, Max, Min } from 'class-validator';


export class BasicPaymentDto {
    @ApiProperty({
        description: 'Mes del pago (1-12)',
        example: 11,
        minimum: 1,
        maximum: 12
    })
    @IsInt()
    @Min(1)
    @Max(12)
    month: number;

    @ApiProperty({
        description: 'Año del pago (4 dígitos)',
        example: 2023,
        minimum: 2000,
        maximum: 2100
    })
    @IsInt()
    @Min(2000)
    @Max(2100)
    year: number;
}
