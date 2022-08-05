import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/SearchCards";
import CardDetail from "./pages/CardDetail";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SetOverview from "./components/SetOverview";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/card-detail" element={<CardDetail />} />
        <Route path="/my-collection" element={<SetOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
