import { useState, useMemo } from "react"
import Modal from '@mui/material/Modal';
import { getProductBidHistory } from "../api/productsApi";



const useBidHistory = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [bidHistory, setBidHistory] = useState([])

    const handleModalOpen = async (id) => {
        const bidHistory = await getProductBidHistory(id)
        setBidHistory(bidHistory.data)
        setModalOpen(true)
    }

    const BidHistoryModal = useMemo(() => <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
            <div className="center bid_history-modal">
                <div className="bid_history-header">
                    <span>Price</span>
                    <span>Username</span>
                    <span>Bid</span>
                </div>
                {bidHistory && bidHistory.map((entry, index) => {
                    return <div className="bid_history-body" key={index}>
                        <div className="bid_history-price" >{entry.price}$</div>
                        <div className="bid_history-userName">{entry.bidder}</div>
                        <div className="bid_history-bid">{entry.bid}$</div>
                    </div>
                })}
            </div>
        </Modal>
    </div>, [modalOpen, bidHistory])

    return {
        handleModalOpen,
        BidHistoryModal
    }
}

export default useBidHistory