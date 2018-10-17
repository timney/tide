import { observable, action, computed } from 'mobx'


export class CustomerStore {
    customers = observable.array([])

    constructor(){
    }

    getCustomers() {

    }
}
