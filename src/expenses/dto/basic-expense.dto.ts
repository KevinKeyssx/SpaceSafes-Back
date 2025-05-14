import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";


export class BasicExpenseDto {
    @ApiProperty({
        description: 'Nombre de la gasto',
        example: 'Gastos de la casa',
        required: true,
    })
    @IsString()
    @Length( 3, 100 )
    name: string;

    @ApiProperty({
        description: 'Descripción de la gasto',
        example: 'Gastos de la casa',
        required: false,
    })
    @IsString()
    @Length( 3, 100 )
    description: string;
}
