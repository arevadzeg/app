import axios from "./axios"


export const login = (data) => {
    try {
        return axios.post('/auth/login', { ...data })
    } catch (err) {
        console.log(err)
        return err
    }
}

export const verifyToken = () => {
    try {
        return axios.post('/auth/verifyToken')
    } catch (err) {
        console.log(err)
        return err
    }
}

export const getUser = () => {
    try {
        return axios.get('/auth/user')
    } catch (err) {
        console.log(err)
        return err
    }
}