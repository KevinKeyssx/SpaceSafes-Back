import { Module } from '@nestjs/common';

import { ServicesService }      from '@services/services.service';
import { ServicesController }   from '@services/services.controller';

@Module({
    controllers : [ServicesController],
    providers   : [ServicesService],
})
export class ServicesModule {}
