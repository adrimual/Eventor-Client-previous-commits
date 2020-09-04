import axios from 'axios'


const errorHandler = (err) => {
    throw err;
 }
export default class Services{
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:4000/api",
            withCredentials: true
        })
    }
    handleUpload(theFile) {
        return this.service
            .post("/files/upload", theFile)
            .then((res) => res.data)
            .catch(errorHandler)
    }
    saveNewThing(newThing) {
        return this.service
            .post("/things/create", newThing)
            .then((res) => res.data)
            .catch(errorHandler)
    }
};