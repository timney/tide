import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class AccountStore {
    accounts = observable.array([])

    constructor(){
    }

    getAccounts(companyId) {
        request
            .get('http://localhost:8899/accounts?companyId='+companyId)
            .then(res => res.body.forEach(d => this.accounts.push(d)))
    }
}
