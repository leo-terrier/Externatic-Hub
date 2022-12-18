import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BackHome from "@pages/backoffice/BackHome/BackHome";
import Candidates from "@pages/backoffice/Candidates/Candidates";
import Entreprises from "@pages/backoffice/Entreprises/Entreprises";
import Offers from "@pages/backoffice/Offers/Offers";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="back" element={<BackHome />}>
            <Route path="entreprises" element={<Entreprises />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="offers" element={<Offers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
