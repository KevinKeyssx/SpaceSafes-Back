import { ApiProperty } from "@nestjs/swagger";

import { IsString, Length } from "class-validator";


export class BasicServiceDto {
    @ApiProperty({
        description: 'Nombre del servicio',
        example: 'Servicio de la casa',
        required: true,
    })
    @IsString()
    @Length( 3, 100 )
    name: string;

    @ApiProperty({
        description: 'Descripción de la gasto',
        example: 'Descripcin del servicio',
        required: false,
    })
    @IsString()
    @Length( 3, 100 )
    description: string;

}