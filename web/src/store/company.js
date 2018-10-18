import { observable, action, computed } from 'mobx'
import request from 'superagent'

export class CompanyStore {
    companies = observable.array([])

    constructor(){
        this.getCompanies()
    }

    getCompanies() {
        request
            .get('http://localhost:8899/companies')
            .then(res => res.body.forEach(d => this.companies.push(d)))
    }
}
