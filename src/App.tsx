import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodePage from "./pages/QRCodePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/movies/:token" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
