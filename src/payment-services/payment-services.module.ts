import { Module } from '@nestjs/common';

import { PaymentServicesService }       from '@payment-services/payment-services.service';
import { PaymentServicesController }    from '@payment-services/payment-services.controller';


@Module({
    controllers : [PaymentServicesController],
    providers   : [PaymentServicesService],
})
export class PaymentServicesModule {}
