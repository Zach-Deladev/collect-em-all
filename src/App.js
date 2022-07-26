import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/SearchCards";
import CardDetail from "./pages/CardDetail";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/card-detail" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
