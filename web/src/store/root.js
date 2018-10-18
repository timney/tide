import { CompanyStore }  from './company'
import { AccountStore } from './account'

export class RootStore {
    companyStore
    accountStore
    constructor() {
        this.companyStore = new CompanyStore()
        this.accountStore = new AccountStore()
    }
}