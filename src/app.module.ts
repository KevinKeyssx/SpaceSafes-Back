import { Module } from '@nestjs/common';

import { AppController }            from './app.controller';
import { AppService }               from './app.service';
import { AccountsModule }           from '@accounts/accounts.module';
import { NavlyModule }              from '@navly/navly.module';
import { NotesModule }              from '@notes/notes.module';
import { BalancesModule }           from '@balances/balances.module';
import { PaymentsModule }           from '@payments/payments.module';
import { CommonModule }             from '@common/common.module';
import { ServicesModule }           from '@services/services.module';
import { ExpensesModule }           from '@expenses/expenses.module';
import { PaymentServicesModule }    from '@payment-services/payment-services.module';

@Module({
    imports: [AccountsModule, NavlyModule, NotesModule, BalancesModule, PaymentsModule, CommonModule, ServicesModule, ExpensesModule, PaymentServicesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
