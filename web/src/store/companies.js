import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class CompanyStore {
    companies = observable.array([])

    constructor(){
        this.getCompanies()
    }

    getCompanies() {
        request
            .get('/companies')
            .then(res => res.body.forEach(d => this.companies.push(d)))
    }
}
