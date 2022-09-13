
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import './autoBid.scss'

const AutoBid = () => {

    const [maxAmount, setMaxAmount] = useState("")
    const [bidAlertNotification, setBidAlertNotification] = useState("")

    return <div className='auto-bid'>
        <h2>Configure Auto bidder</h2>

        <form className='auto_bid-form'>

            <TextField className='textField' value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} variant='standard' label='Maximum amount' />
            <TextField className='textField' value={bidAlertNotification} variant='standard' onChange={(e) => setBidAlertNotification(e.target.value)} label='Bid alert notification' />

            <Button className='button'>Submit</Button>

        </form>
    </div>

}

export default AutoBid