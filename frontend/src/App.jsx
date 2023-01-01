import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";
import AllEntreprises from "@pages/backoffice/AllEntreprises/AllEntreprises";
import AllOffers from "@pages/backoffice/AllOffers/AllOffers";
import AllCandidates from "@pages/backoffice/AllUsers/AllUsers";
import BackHome from "@pages/backoffice/BackHome/BackHome";
import Entreprise from "@pages/backoffice/Entreprise/Entreprise";
import Offer from "@pages/backoffice/Offer/Offer";
import Proposition from "@pages/backoffice/Proposition/Proposition";
import User from "@pages/backoffice/User/User";
import EntrepriseSearch from "@pages/frontoffice/EntrepriseSearch";
import JobSearch from "@pages/frontoffice/JobSearch";
import "./App.css";
import Home from "./pages/frontoffice/Home";

function App() {
  const defaultMaterialTheme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="entreprises" element={<EntrepriseSearch />} />
              <Route path="/" element={<JobSearch />} />
            </Route>
            <Route path="back" element={<BackHome />}>
              <Route path="entreprise" element={<AllEntreprises />} />
              <Route path="entreprise/:id" element={<Entreprise />} />
              <Route path="candidat" element={<AllCandidates />} />
              <Route path="candidat/:id" element={<User />} />
              <Route path="offre" element={<AllOffers />} />
              <Route path="offre/:id" element={<Offer />} />
              <Route path="proposition/:id" element={<Proposition />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
