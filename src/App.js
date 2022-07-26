import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/SearchCards";
import CardDetail from "./pages/CardDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/card-detail" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
