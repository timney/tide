import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class AccountStore {
    rootStore
    accounts = observable.array([])

    constructor(rootstore){
        this.rootStore = rootstore
    }

    getAccounts(companyId) {
        this.accounts.clear()
        request
            .get(this.rootStore.base+'/accounts?companyId='+companyId)
            .then(res => res.body.forEach(d => this.accounts.push(d)))
    }
}
