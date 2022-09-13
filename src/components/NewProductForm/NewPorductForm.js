import { TextField, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { createNewProduct, uploadMultipleFiles, uploadSingleFile, editProduct } from '../../api/uploadFile';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './newProductForm.scss'
import { useFormik } from 'formik';
import { NewProductSchema } from '../../validationSchemas/NewProductSchema';
import { isEmpty } from 'lodash'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ThreeDays = 259200000

const NewProductForm = ({ formMode, productToEdit, setProducts, setProductToEdit }) => {

    const [images, setImages] = useState([])

    const defaultValues = useMemo(() => {
        return {
            auctionDate: formMode === 'edit' ? productToEdit.auctionDate : new Date(Date.now() + ThreeDays),
            name: formMode === 'edit' ? productToEdit.name : "",
            description: formMode === 'edit' ? productToEdit.description : "",
            price: formMode === 'edit' ? productToEdit.onGoingPrice : "",
        }
    }, [formMode, productToEdit])

    console.log('ffffffffffff', editProduct, productToEdit)

    const formik = useFormik({
        initialValues: {
            auctionDate: defaultValues.auctionDate,
            name: defaultValues.name,
            description: defaultValues.description,
            price: defaultValues.price
        },
        onSubmit: async (values) => {
            try {
                const imageNames = (images.length > 0 && await saveImageInDB()) || []
                if (formMode === 'edit') {
                    const response = await editProduct(productToEdit._id, { ...values, onGoingPrice: values.price, image: [...imageNames, ...productToEdit.image] })
                    console.log('aq tu movida')
                    setProducts((prev) => [response.data, ...prev,])

                } else {
                    const product = await createNewProduct({ ...values, onGoingPrice: values.price, image: imageNames })
                    setProducts((prev) => [...prev, product.data])
                    setImages([])
                    formik.resetForm()
                }
            } catch (err) {
                console.log(err)
            }
        },
        validationSchema: NewProductSchema,
        validateOnBlur: false,
        validateOnChange: false
    })

    const cancelImage = (index) => {
        images.splice(index, 1)
        setImages([...images])
    }

    const handleImageUpload = (e) => {
        const prevFiles = [...images]
        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i]
            if (file.size < 50000000) {
                prevFiles.push(file)
            }
        }
        setImages([...prevFiles])
    }

    const saveImageInDB = async () => {
        if (!isEmpty(images)) {
            const data = new FormData()
            if (images.length === 1) {
                data.append('image', images[0])
                try {
                    const response = await uploadSingleFile(data)
                    return response.data
                } catch (err) { }
            }
            else {
                images.forEach((image) => data.append('image', image))
                try {
                    const response = await uploadMultipleFiles(data)
                    return response.data
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    return <form className='new_product-form'>

        <TextField label='name'
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange} />
        <TextField label='description'
            multiline
            error={Boolean(formik.errors.description)}
            helperText={formik.errors.description}
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
        />
        <TextField label='starting price'
            error={Boolean(formik.errors.price)}
            helperText={formik.errors.price}
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange} />
        <Button
            variant="contained"
            component="label"
            name='image'
        >
            Upload File
            <input
                type="file"
                name='image'
                onChange={handleImageUpload}
                hidden
                multiple
            />
        </Button>
        {
            <div className='attachments'>{
                !isEmpty(images) && images.map((image, index) => {

                    return <div className='attachment' key={index}>
                        <RemoveCircleIcon onClick={() => cancelImage(index)} />
                        <img src={URL.createObjectURL(image)} alt=" " />
                    </div>
                })

            }
                {!isEmpty(productToEdit) && productToEdit.image.map((img, index) => {
                    return <div className='attachment' key={index}>
                        <RemoveCircleIcon onClick={() => {
                            setProductToEdit((prev) => {
                                const filteredImages = productToEdit.image.filter((img, i) => i !== index)
                                return {
                                    ...prev,
                                    image: filteredImages
                                }
                            })
                        }} />
                        <img src={img} alt=" " />
                    </div>
                })}

            </div>
        }
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Date&Time picker"
                name='auctionDate'
                value={formik.values.auctionDate}
                onChange={(e) => formik.setFieldValue('auctionDate', e)}
                error={Boolean(formik.errors.auctionDate)}
                helperText={formik.errors.auctionDate}
                renderInput={(params) => <TextField {...params}
                />}
            />
        </LocalizationProvider>


        <Button variant='outlined' onClick={formik.handleSubmit}>SUBMIT</Button>
    </form>

}

export default NewProductForm