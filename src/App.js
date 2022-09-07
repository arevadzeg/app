import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Routes/LoginPage/LoginPage";
import Auction from "./Routes/Auction/Auction";

function App() {
  return (
    <div className="App">

      <Header />

      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path='/auction' element={<Auction />} />

      </Routes>
    </div>
  );
}

export default App;
