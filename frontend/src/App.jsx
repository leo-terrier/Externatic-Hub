import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";
import AllCandidates from "@pages/backoffice/AllUsers/AllUsers";
import AllEntreprises from "@pages/backoffice/AllEntreprises/AllEntreprises";
import AllOffers from "@pages/backoffice/AllOffers/AllOffers";
import BackHome from "@pages/backoffice/BackHome/BackHome";
import Candidate from "@pages/backoffice/User/User";
import Entreprise from "@pages/backoffice/Entreprise/Entreprise";
import Offer from "@pages/backoffice/Offer/Offer";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const defaultMaterialTheme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
