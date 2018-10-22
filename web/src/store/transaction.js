import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class TransactionStore {
    rootStore
    transactions = observable.array([])

    constructor(rootstore){
        this.rootStore = rootstore
    }

    getTransactions(accountId) {
        this.transactions.clear()
        request
            .get(this.rootStore.base+'/transactions?accountId='+accountId)
            .then(res => res.body.forEach(d => this.transactions.push(d)))
    }
}
