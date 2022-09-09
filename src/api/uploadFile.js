import axiosInstance from "./axios";

export const uploadSingleFile = (data) => {
    try {
        return axiosInstance.post('/upload/single', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        console.log(err)
        return err
    }
}
export const uploadMultipleFiles = (data) => {
    try {
        return axiosInstance.post('/upload/multiple', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        console.log(err)
        return err
    }
}


export const createNewProduct = (data) => {
    try {
        return axiosInstance.post('product', data)
    } catch (err) {
        console.log(err)
    }
}

export const getAllProducts = (page) => {
    try {
        return axiosInstance.get(`product?page=${page}`)
    } catch (err) {
        console.log(err)
    }
}