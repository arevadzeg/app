import './profile.scss'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import useBidHistory from '../../hooks/useBidHistory';


const Profile = () => {

    const { user } = useSelector((data) => data)
    const navigate = useNavigate()
    const {
        handleModalOpen,
        BidHistoryModal } = useBidHistory()

    console.log(user)

    const checkStatus = (product) => {
        let status = 'in-progress'
        const auctionDate = new Date(product.auctionDate)
        if (auctionDate.getTime() < Date.now()) {
            status = product.bidHistory[0].bidder === user.username ? 'won' : 'lost'
        }
        return <div className={`product-status ${status}`}>
            {status}
        </div>

    }

    return <div className='profile'>


        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Price&nbsp;(g)</TableCell>
                        <TableCell align="right">Current bidder&nbsp;(g)</TableCell>
                        <TableCell align="right">Price&nbsp;(g)</TableCell>
                        <TableCell align="right">Status&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user && user.bidHistory.map((product, i) => (
                        <TableRow
                            key={i}

                        >
                            <TableCell component="th" scope="row" onClick={() => navigate("/auction/" + product._id)}>
                                {product.name}
                            </TableCell>
                            <TableCell align="right">{product.image.length ?
                                <img src={product.image[0]} alt=" " className='product_image' /> :
                                <div className='product_no-image'>
                                    No image
                                </div>
                            }</TableCell>
                            <TableCell align="right">{product.bidHistory[0].bidder}</TableCell>
                            <TableCell align="right">{product.onGoingPrice}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => handleModalOpen(product._id)}>
                                    Bid history
                                </Button>
                            </TableCell>
                            <TableCell align="right">{checkStatus(product)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {BidHistoryModal}
    </div>

}

export default Profile