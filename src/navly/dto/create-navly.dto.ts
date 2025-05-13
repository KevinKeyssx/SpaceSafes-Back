import { IntersectionType } from "@nestjs/swagger";

import { BasicNavlyDto }    from "@navly/dto/basic-navly.dto";
import { UserIdDto }        from "@common/dtos/user-id.dto";


export class CreateNavlyDto extends IntersectionType(
    BasicNavlyDto,
    UserIdDto
) {}
