import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bidOnProduct, getSingleProduct } from '../../api/productsApi'
import { isEmpty } from 'lodash'
import './productPage.scss'
import { Button, Checkbox, CircularProgress, FormControlLabel, TextField, Tooltip } from '@mui/material'
import GavelIcon from '@mui/icons-material/Gavel';
import useCountDown from '../../hooks/useCountDown'
import QuestionMarkSVG from '../../assets/QuestionMarkSVG'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import useBidHistory from '../../hooks/useBidHistory'
import { setAutoBid } from '../../redux/actions'
import { createAutoBid } from '../../api/autoBid'

const ProductPage = () => {

    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [bidAmount, setBidAmount] = useState("")
    const [bidError, setBidError] = useState(null)
    let { id } = useParams();
    const { user, autoBid } = useSelector((data) => data)
    const dispatch = useDispatch()
    const {
        handleModalOpen,
        BidHistoryModal } = useBidHistory(product?.bidHistory)

    const ownerIsTheHighestBidder = useMemo(() => product?.bidHistory[0]?.bidder === user?.username, [product, user])

    const handleTurnOnAutoBid = async () => {
        let filteredProducts = []
        if (autoBid.products.includes(id)) {
            filteredProducts = autoBid.products.filter((product) => product !== id)
        } else { filteredProducts = [...autoBid.products, id] }
        dispatch(setAutoBid({ ...autoBid, products: filteredProducts }))
        try {
            await createAutoBid({ products: filteredProducts })
        } catch (err) { console.log(err) }
    }

    const handleBid = async () => {
        const prevBid = product.bidHistory[0]?.bid || 0
        if ((bidAmount > prevBid) && !ownerIsTheHighestBidder) {
            const newPrice = Number(product.onGoingPrice) + Number(bidAmount)
            const newBidHistoryEntry = { bidder: user.username, price: newPrice, bid: bidAmount }
            const newBidHistory = [newBidHistoryEntry, ...product.bidHistory]
            await bidOnProduct(id, { onGoingPrice: newPrice, bidHistory: newBidHistoryEntry })
            setProduct((prev) => { return { ...prev, onGoingPrice: newPrice, bidHistory: newBidHistory } })
            setBidAmount("")
            setBidError("")
        } else {
            setBidError('Bid amount should be more than previous bid')
        }
    }

    useEffect(() => {
        getSingleProduct(id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id])

    const countDown = useCountDown(new Date(product?.auctionDate))

    return <div className='product-wrapper'>
        {
            (loading && !product) ?
                <CircularProgress className='center' />
                :
                <>
                    <div className='product_gallery'>
                        <img src={product.image[selectedImage]} alt=' ' className='product_image-selected' />
                        <div className='product_gallery'>
                            {
                                !isEmpty(product.image) && product.image.map((img, i) => {
                                    return <img src={img} alt=" " className={`product_image-small ${i === selectedImage && "product_image-small-selected"}`} key={i} onClick={() => setSelectedImage(i)} />
                                })
                            }
                        </div>
                    </div>
                    <div>

                        <div className='product_info'>
                            <div className='product_info-top'>
                                <div className='product_info-price'>
                                    <span>{product.name}</span>
                                    <h4>{product.onGoingPrice}$</h4>
                                </div>
                                <div className='product_info-countdown'>
                                    <b>Ends in</b>
                                    <span>{countDown.days}d : {countDown.hours}h : {countDown.seconds}s</span>
                                </div>
                            </div>
                            <div className='product_info-bottom'>
                                <div className='bid_info-history' onClick={() => handleModalOpen(product._id)}>
                                    [ {product.bidHistory.length} Bids] Bidding History
                                </div>
                                <Tooltip title={<>
                                    <p>1.Bid should higher than previous bid </p>
                                    <p>2.You can not bid if you are the previous highest bidder </p>
                                </>}
                                    placement="top-end">
                                    <div className='bid_info-tooltip'>
                                        <QuestionMarkSVG />
                                    </div>
                                </Tooltip>
                                <TextField
                                    className='product_bid-input textField'
                                    error={Boolean(bidError)}
                                    helperText={bidError}
                                    variant='outlined'
                                    value={bidAmount}
                                    onKeyDown={(e) => e.key === 'Backspace' ? {} : isNaN(Number(e.key)) ? e.preventDefault() : {}}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    InputProps={{ endAdornment: <Button onClick={handleBid} disabled={ownerIsTheHighestBidder} className='button' variant='contained' disableElevation startIcon={<GavelIcon />}>Bid</Button> }}
                                />
                            </div>
                        </div>
                        <FormControlLabel control={<Checkbox checked={autoBid.products.includes(id)} color="default" onClick={handleTurnOnAutoBid} />} label="Turn on auto-bid" />

                        <div className='product_description'>
                            <h4>Lot description</h4>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    {BidHistoryModal}
                </>
        }
    </div>
}

export default ProductPage