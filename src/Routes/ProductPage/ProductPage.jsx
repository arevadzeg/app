import { useCallback, useEffect, useState } from 'react'
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
import socket from '../../services/socket'
import { useRef } from 'react'

const ProductPage = () => {

    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [bidAmount, setBidAmount] = useState("")
    const [bidError, setBidError] = useState(null)
    let { id } = useParams();
    const { user, autoBid } = useSelector((data) => data)
    const dispatch = useDispatch()
    const { handleModalOpen, BidHistoryModal } = useBidHistory(product?.bidHistory)
    const priceRef = useRef(null)

    useEffect(() => {
        socket.emit('joinRoom', id)
        socket.on('bidPlaced', (res) => {
            if (priceRef.current) {
                priceRef.current.className = 'demo'
                setTimeout(() => {
                    priceRef.current.className = ''
                }, 600);
            }
            setProduct((prev) => { return { ...prev, onGoingPrice: res.newPrice, bidHistory: res.newBidHistory } })
        })
        return () => {
            socket.off('joinRoom');
            socket.off('bidPlaced');
        }
    }, [])

    const ownerIsTheHighestBidder = useMemo(() => product?.bidHistory[0]?.bidder === user?.username, [product, user])

    const handleTurnOnAutoBid = useCallback(
        async () => {
            let filteredProducts = []
            if (autoBid.products.includes(id)) {
                filteredProducts = autoBid.products.filter((product) => product !== id)
            } else { filteredProducts = [...autoBid.products, id] }
            dispatch(setAutoBid({ ...autoBid, products: filteredProducts }))
            try {
                await createAutoBid({ products: filteredProducts })
            } catch (err) { console.log(err) }
        },
        [autoBid, dispatch, id],
    )

    const handleBid = useCallback(
        async () => {
            const prevBid = product.bidHistory[0]?.bid || 0
            if ((bidAmount > prevBid) && !ownerIsTheHighestBidder) {
                const newPrice = Number(product.onGoingPrice) + Number(bidAmount)
                const newBidHistoryEntry = { bidder: user.username, price: newPrice, bid: bidAmount }
                await bidOnProduct(id, { onGoingPrice: newPrice, bidHistory: newBidHistoryEntry })
                setBidAmount("")
                setBidError("")
            } else {
                setBidError('Bid amount should be more than previous bid')
            }
        },
        [bidAmount, id, ownerIsTheHighestBidder, product, user]
    )

    useEffect(() => {
        getSingleProduct(id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [id])


    const countDown = useCountDown(new Date(product?.auctionDate))

    useEffect(() => {
        if (countDown.seconds < 0) {
            setProduct((prev) => { return { ...prev, active: false } })
        }

    }, [countDown])

    return <div className='product-wrapper'>
        {
            (loading && !product) ?
                <CircularProgress className='center' />
                :
                <>
                    <div className='product_gallery'>
                        <img src={product?.image[selectedImage] || 'http://localhost:3000/noImage.png'} alt=' ' className='product_image-selected' />
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
                                    {
                                        product.active ?
                                            <h4 ref={priceRef}>{product.onGoingPrice}$</h4>
                                            :
                                            <p>
                                                {
                                                    product.bidHistory.length > 0 ? <div>
                                                        <h3>Sold for {product.bidHistory[0].price} $</h3>
                                                        <h4>Winner {product.bidHistory[0].bidder} </h4>
                                                    </div>
                                                        : "No bid placed"
                                                }
                                            </p>
                                    }
                                </div>
                                {product.active && <div className='product_info-countdown'>
                                    <b>Ends in</b>
                                    <span>{countDown.days}d : {countDown.hours}h : {countDown.seconds}s</span>
                                </div>}
                            </div>
                            <div className='product_info-bottom'>
                                <div className='bid_info-history' onClick={() => handleModalOpen(product._id)}>
                                    [ {product.bidHistory.length} Bids] Bidding History
                                </div>
                                {product.active &&
                                    <Tooltip title={<>
                                        <p>1.Bid should higher than previous bid </p>
                                        <p>2.You can not bid if you are the previous highest bidder </p>
                                    </>}
                                        placement="top-end">
                                        <div className='bid_info-tooltip'>
                                            <QuestionMarkSVG />
                                        </div>
                                    </Tooltip>}
                                {
                                    product.active &&
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
                                }
                            </div>
                        </div>
                        {
                            product.active && <FormControlLabel
                                control={<Checkbox
                                    checked={autoBid.products.includes(id)}
                                    color="default"
                                    onClick={handleTurnOnAutoBid} />}
                                label="Turn on auto-bid" />
                        }
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