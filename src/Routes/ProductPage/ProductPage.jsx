import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../api/uploadFile'
import { isEmpty } from 'lodash'
import './productPage.scss'
import { Button, CircularProgress, TextField, Tooltip } from '@mui/material'
import GavelIcon from '@mui/icons-material/Gavel';
import useCountDown from '../../hooks/useCountDown'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkSVG from '../../assets/QuestionMarkSVG'

const ProductPage = () => {

    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)

    let { id } = useParams();


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
                                <div className='bid_info-history'>
                                    [ {product.bidHistory.length} Bids] Bidding History
                                </div>
                                <Tooltip title="Bid should higher than previous bid" placement="top-end">
                                    <div className='bid_info-tooltip'>
                                        <QuestionMarkSVG />
                                    </div>
                                </Tooltip>
                                <TextField
                                    className='product_bid-input'
                                    variant='outlined'
                                    InputProps={{ endAdornment: <Button variant='contained' disableElevation startIcon={<GavelIcon />}>Bid</Button> }}
                                />
                            </div>
                        </div>
                        <div className='product_description'>
                            <h4>Lot description</h4>
                            <p>{product.description}</p>
                        </div>
                    </div>

                </>
        }


    </div>
}

export default ProductPage