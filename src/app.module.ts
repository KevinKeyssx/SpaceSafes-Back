import { Module } from '@nestjs/common';

import { AppController }            from './app.controller';
import { AccountsModule }           from '@accounts/accounts.module';
import { NavlyModule }              from '@navly/navly.module';
import { NotesModule }              from '@notes/notes.module';
import { BalancesModule }           from '@balances/balances.module';
import { CommonModule }             from '@common/common.module';
import { ServicesModule }           from '@services/services.module';
import { ExpensesModule }           from '@expenses/expenses.module';
import { PaymentServicesModule }    from '@payment-services/payment-services.module';
import { PaymentDetailsModule }     from '@payment-details/payment-details.module';

@Module({
    imports     : [
        AccountsModule,
        NavlyModule,
        NotesModule,
        BalancesModule,
        CommonModule,
        ServicesModule,
        ExpensesModule,
        PaymentServicesModule,
        PaymentDetailsModule
    ],
    controllers : [AppController],
    providers   : [],
})
export class AppModule {}
