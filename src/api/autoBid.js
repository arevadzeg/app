import axiosInstance from "./axios"


export const createAutoBid = (data) => {
    try {
        return axiosInstance.post('autobid', data)
    } catch (err) {
        console.log(err)
    }
}

export const getAutoBid = () => {
    try {
        return axiosInstance.get('autobid')
    } catch (err) {
        console.log(err)
    }
}