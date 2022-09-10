import './Auction.scss'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/uploadFile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sort from '../../components/Sort/Sort';


const Auction = () => {

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        getAllProducts(page).then((res) => {
            setTotalPages(res.data.pages)
            setProducts(res.data.products)
        })
    }, [page])


    const { search, sort } = useSelector((data) => data)

    useEffect(() => setInitialRender(false), [])

    const handleSearchSort = async () => {
        console.log(page, search, sort)
        const { data } = await getAllProducts(page, search, sort)
        setProducts(data.products)
        setTotalPages(data.pages)
        setPage(1)
    }

    useEffect(() => {
        if (!initialRender) {
            handleSearchSort()
        }
    }, [search, sort])

    return <div className="auction">

        <div className='auction-header'>
            <h2>Upcoming auctions</h2>
            <Sort />
        </div>
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