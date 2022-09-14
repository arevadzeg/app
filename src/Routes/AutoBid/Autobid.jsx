
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import './autoBid.scss'
import { AutoBidSchema } from '../../validationSchemas/AutoBidSchema'
import { createAutoBid, getAutoBid } from '../../api/autoBid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAutoBid } from '../../redux/actions'
import { isEmpty } from 'lodash'
import { useState } from 'react'

const AutoBid = () => {

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const { autoBid } = useSelector((data) => data)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            maxAmount: "",
            bidAlertNotification: ""
        },
        onSubmit: async (values) => {
            console.log('asdasd')
            const res = await createAutoBid(formik.values)
            dispatch(setAutoBid(res.data))
            setOpenSnackBar(true)
            console.log(res)
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

        {!isEmpty(autoBid) && <p>Auto-bid activated on {autoBid.products.length} products</p>}

        <Snackbar open={openSnackBar} autoHideDuration={2600000} onClose={() => setOpenSnackBar(false)}>
            <Alert onClose={() => setOpenSnackBar(false)} severity="success">
                Updated successfully
            </Alert>
        </Snackbar>
    </div>

}

export default AutoBid