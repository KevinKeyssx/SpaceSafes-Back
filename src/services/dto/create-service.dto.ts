import { ApiProperty, IntersectionType } from "@nestjs/swagger";

import { IsString, Length } from "class-validator";

import { UserIdDto }        from "@common/dtos/user-id.dto";
import { BasicServiceDto }  from "@services/dto/basic-service.dto";

export class CreateServiceDto extends IntersectionType(
    UserIdDto,
    BasicServiceDto
) {
    @ApiProperty({
        description: 'Id de la gasto',
        example: 'd69f0df9-2411-46e2-a633-c489a1cee41e',
        required: false,
    })
    @IsString()
    @Length( 3, 100 )
    expenseId: string;
}