import './Auction.scss'
import Image from '../../assets/painting.jpg'
import Pagination from '@mui/material/Pagination';


const Auction = () => {

    return <div className="auction">

        <h2>Upcoming auctions</h2>
        <div className="auction_items-wrapper">

            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>
            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>
            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>
            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>
            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>
            <div className="auction-item">
                <img src={Image} alt=' ' />
                <span>Painting</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, praesentium possimus dolore, odit soluta at quaerat esse magni amet nesciunt obcaecati inventore ad! Harum incidunt eveniet vel iusto quo illum.
                </p>
            </div>

        </div>


        <Pagination count={10} variant="outlined" />

    </div>
}

export default Auction