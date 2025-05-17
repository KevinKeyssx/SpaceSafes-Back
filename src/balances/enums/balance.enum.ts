export enum TypeBalance {
    CREDIT          = 'CREDIT',
    DEBIT           = 'DEBIT',
    BANK_ACCOUNT    = 'BANK_ACCOUNT',
    CASH            = 'CASH',
    FREELANCE       = 'FREELANCE',
    SAVINGS         = 'SAVINGS',
    INVESTMENT      = 'INVESTMENT',
    OTHER           = 'OTHER'
}


export enum TypeCard {
    VISA                = 'VISA',
    VISA_ELECTRON       = 'VISA_ELECTRON',
    MASTERCARD          = 'MASTERCARD',
    AMERICAN_EXPRESS    = 'AMERICAN_EXPRESS',
    DISCOVER            = 'DISCOVER',
    JCB                 = 'JCB',
    DINERS_CLUB         = 'DINERS_CLUB',
    UNIONPAY            = 'UNIONPAY',
    MAESTRO             = 'MAESTRO',
    ELO                 = 'ELO',
    HIPERCARD           = 'HIPERCARD',
    AURA                = 'AURA'
}


export const TypeBalanceValues = Object.values(TypeBalance);
export const TypeCardValues = Object.values(TypeCard);