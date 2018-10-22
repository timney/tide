import { CompanyStore }  from './company'
import { AccountStore } from './account'
import { TransactionStore } from './transaction'

export class RootStore {
    companyStore
    accountStore
    transactionStore
    base = process.env.NODE_ENV !== 'production' ? 'http://localhost:8899' : ''

    constructor() {
        this.companyStore = new CompanyStore(this)
        this.accountStore = new AccountStore(this)
        this.transactionStore = new TransactionStore(this)
    }
}