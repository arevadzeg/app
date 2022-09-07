import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./Routes/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">

      <Header />

      <Routes>

        <Route path="/" element={<LoginPage />} />

      </Routes>
    </div>
  );
}

export default App;
