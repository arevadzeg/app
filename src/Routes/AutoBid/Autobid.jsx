
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import './autoBid.scss'
import { AutoBidSchema } from '../../validationSchemas/AutoBidSchema'
import { createAutoBid, getAutoBid } from '../../api/autoBid'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AutoBid = () => {


    const { autoBid } = useSelector((data) => data)

    const formik = useFormik({
        initialValues: {
            maxAmount: "",
            bidAlertNotification: ""
        },
        onSubmit: async (values) => {
            const res = await createAutoBid(formik.values)
            console.log('zz', res)
        },
        validationSchema: AutoBidSchema,
        validateOnBlur: false,
        validateOnChange: false
    })


    useEffect(() => {
        getAutoBid().then((res) => {
            formik.setFieldValue("maxAmount", autoBid.maxAmount)
            formik.setFieldValue("bidAlertNotification", autoBid.bidAlertNotification)
        }).catch(err => console.log(err))
    }, [autoBid])

    return <div className='auto-bid'>
        <h2>Configure Auto bidder</h2>

        <form className='auto_bid-form'>

            <TextField
                className='textField'
                value={formik.values.maxAmount}
                variant='standard'
                label='Maximum amount'
                error={Boolean(formik.errors.maxAmount)}
                helperText={formik.errors.maxAmount}
                name='maxAmount'
                onChange={formik.handleChange}
            />
            <TextField
                className='textField'
                value={formik.values.bidAlertNotification}
                variant='standard'
                label='Bid alert notification'
                error={Boolean(formik.errors.bidAlertNotification)}
                helperText={formik.errors.bidAlertNotification}
                name='bidAlertNotification'
                onChange={formik.handleChange} />

            <Button className='button' onClick={formik.handleSubmit}>Submit</Button>

        </form>
    </div>

}

export default AutoBid