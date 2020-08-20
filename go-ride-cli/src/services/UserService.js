import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/user',
            withCredentials: true
        })
    }

    editUserProfile = (id, updatedUser) => this.service.post(`edit/${id}`, updatedUser)

}