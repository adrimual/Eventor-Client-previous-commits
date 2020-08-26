import axios from 'axios';

export default class PersonService {

    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    editPersonProfile = (id, updatedUser) => this.service.post(`person/profile/edit/${id}`, updatedUser)
    getPersonDetails = (personDet_id) => this.service.get(`person/personDetails/${personDet_id}`)
}