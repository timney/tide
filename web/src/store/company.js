import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class CompanyStore {
    rootStore
    companies = observable.array([])

    constructor(rootstore){
        this.rootStore = rootstore
    }

    getCompanies() {
        request
            .get(this.rootStore.base+'/companies')
            .then(res => res.body.forEach(d => this.companies.push(d)))
    }
}
