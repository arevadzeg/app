import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Routes/LoginPage/LoginPage";
import Auction from "./Routes/Auction/Auction";
import Admin from "./Routes/Admin/Admin";
import ProductPage from "./Routes/ProductPage/ProductPage";

function App() {
  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/auction' exact element={<Auction />} />
        <Route path='/auction/:id' element={<ProductPage />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
