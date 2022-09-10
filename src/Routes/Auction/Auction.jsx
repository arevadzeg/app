import './Auction.scss'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/uploadFile';
import { Link } from 'react-router-dom';


const Auction = () => {

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getAllProducts(page).then((res) => {
            setTotalPages(res.data.pages)
            setProducts(res.data.products)
        })
    }, [page])

    return <div className="auction">

        <h2>Upcoming auctions</h2>
        <div className="auction_items-wrapper">

            {
                products.map((product, i) => {
                    return <Link to={`${product._id}`}>
                        <div className="auction_item" key={i}>
                            <img src={product.image[0] || 'noImage.png'} alt=' ' />
                            <div className='auction_item-info'>
                                <span>{product.name}</span>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                })
            }

        </div>


        <Pagination count={totalPages} variant="outlined" onChange={(e) => setPage(e.target.textContent)} />

    </div>
}

export default Auction