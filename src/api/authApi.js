import axios from "./axios"


export const login = (data) => {
    try {
        return axios.post('/auth/login', { ...data })
    } catch (err) {
        console.log(err)
        return err
    }
}