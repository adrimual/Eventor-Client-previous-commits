import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/',
            withCredentials: true
        })
    }

    editUserProfile = (id, updatedUser) => {
        console.log("this is id", id, "this is the user", updatedUser)
        this.service.post(`user/profile/edit/${id}`, updatedUser)
    }

}