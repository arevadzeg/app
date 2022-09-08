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