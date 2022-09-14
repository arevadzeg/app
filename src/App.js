import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Routes/LoginPage/LoginPage";
import Auction from "./Routes/Auction/Auction";
import Admin from "./Routes/Admin/Admin";
import ProductPage from "./Routes/ProductPage/ProductPage";
import { useEffect } from "react";
import { verifyToken } from "./api/authApi";
import { useDispatch } from "react-redux";
import { setAutoBid, setUser } from "./redux/actions";
import AutoBid from "./Routes/AutoBid/Autobid";
import { getAutoBid } from "./api/autoBid";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    verifyToken().then((res) => {
      if (location.pathname === '/') {
        navigate('/auction')
      }
      dispatch(setUser(res.data))
    }).catch((err) => {
      localStorage.clear()
      navigate('/')
    })

    getAutoBid().then((res) => {
      dispatch(setAutoBid(res.data))
    }).catch(err => console.log(err))
  }, [])


  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/auction' exact element={<Auction />} />
        <Route path='/auction/:id' element={<ProductPage />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/autobid' element={<AutoBid />} />
      </Routes>
    </div>
  );
}

export default App;
