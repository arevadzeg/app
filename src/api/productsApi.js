import axiosInstance from "./axios"

export const createNewProduct = (data) => {
    try {
        return axiosInstance.post('product', data)
    } catch (err) {
        console.log(err)
    }
}

export const getAllProducts = (page = 1, search = "", sort = "") => {
    if (sort === "default") sort = ""
    const params = new URLSearchParams({
        page,
        search,
        sort,
    });
    try {
        return axiosInstance.get('product?' + params)
    } catch (err) {
        console.log(err)
    }
}

export const getSingleProduct = (id) => {
    try {
        return axiosInstance.get(`product/${id}`)
    } catch (err) {
        console.log(err)
    }
}

export const getProductBidHistory = (id) => {
    try {
        return axiosInstance.get(`product/bidhistory/${id}`)
    } catch (err) {
        console.log(err)
    }
}

export const bidOnProduct = (id, data) => {
    try {
        return axiosInstance.post(`product/bid/${id}`, data)
    } catch (err) {

    }
}


export const deleteProduct = (id) => {
    try {
        return axiosInstance.delete(`product/${id}`)
    } catch (err) {
        console.log(err)
    }
}

export const editProduct = (id, data) => {
    try {
        return axiosInstance.put(`product/${id}`, data)
    } catch (err) {
        console.log(err)
    }
}