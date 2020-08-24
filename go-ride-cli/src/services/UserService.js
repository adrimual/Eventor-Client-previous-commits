import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/',
            withCredentials: true
        })
    }

    editUserProfile = (id, updatedUser) => this.service.post(`user/profile/edit/${id}`, updatedUser)
    getUserDetails = id => this.service.get(`user/profile/${id}`)

}