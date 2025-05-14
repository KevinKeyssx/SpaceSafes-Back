import { Injectable } from '@nestjs/common';
import { CreatePaymentServiceDto } from './dto/create-payment-service.dto';
import { UpdatePaymentServiceDto } from './dto/update-payment-service.dto';

@Injectable()
export class PaymentServicesService {
    create(createPaymentServiceDto: CreatePaymentServiceDto) {
        return 'This action adds a new paymentService';
    }

    findAll() {
        return `This action returns all paymentServices`;
    }

    findOne(id: number) {
        return `This action returns a #${id} paymentService`;
    }

    update(id: number, updatePaymentServiceDto: UpdatePaymentServiceDto) {
        return `This action updates a #${id} paymentService`;
    }

    remove(id: number) {
        return `This action removes a #${id} paymentService`;
    }
}
