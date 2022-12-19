import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AllCandidates from "@pages/backoffice/AllCandidates/AllCandidates";
import AllEntreprises from "@pages/backoffice/AllEntreprises/AllEntreprises";
import AllOffers from "@pages/backoffice/AllOffers/AllOffers";
import BackHome from "@pages/backoffice/BackHome/BackHome";
import Candidate from "@pages/backoffice/Candidate/Candidate";
import Entreprise from "@pages/backoffice/Entreprise/Entreprise";
import Offer from "@pages/backoffice/Offer/Offer";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="back" element={<BackHome />}>
            <Route path="entreprise" element={<AllEntreprises />} />
            <Route path="entreprise/:id" element={<Entreprise />} />
            <Route path="candidat" element={<AllCandidates />} />
            <Route path="candidat/:id" element={<Candidate />} />
            <Route path="offre" element={<AllOffers />} />
            <Route path="offre/:id" element={<Offer />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
