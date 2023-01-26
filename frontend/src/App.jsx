import UserContext from "@components/frontandback/UserContext";
import { createTheme, ThemeProvider } from "@mui/material";
import AllEntreprises from "@pages/backoffice/AllEntreprises";
import AllOffers from "@pages/backoffice/AllOffers";
import AllUsers from "@pages/backoffice/AllUsers";
import BackHome from "@pages/backoffice/BackHome";
import Entreprise from "@pages/backoffice/Entreprise";
import Offer from "@pages/backoffice/Offer";
import Proposition from "@pages/backoffice/Proposition";
import User from "@pages/backoffice/User";
import EntreprisePage from "@pages/frontoffice/EntreprisePage";
import EntrepriseSearch from "@pages/frontoffice/EntrepriseSearch";
import Login from "@pages/frontoffice/Login";
import MyAccount from "@pages/frontoffice/MyAccount";
import OfferPage from "@pages/frontoffice/OfferPage";
import OfferSearch from "@pages/frontoffice/OfferSearch";
import Register from "@pages/frontoffice/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/frontoffice/Home";

function App() {
  const defaultMaterialTheme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <UserContext>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="entreprise" element={<EntrepriseSearch />} />
                <Route path="/entreprise/:id" element={<EntreprisePage />} />
                <Route path="/" element={<OfferSearch />} />
                <Route path="/offre/:id" element={<OfferPage />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="back" element={<BackHome />}>
                <Route path="entreprise" element={<AllEntreprises />} />
                <Route path="entreprise/:id" element={<Entreprise />} />
                <Route path="user" element={<AllUsers />} />
                <Route path="user/:id" element={<User />} />
                <Route path="offre" element={<AllOffers />} />
                <Route path="offre/:id" element={<Offer />} />
                <Route path="proposition/:id" element={<Proposition />} />
              </Route>
            </Routes>
          </Router>
        </UserContext>
      </ThemeProvider>
    </div>
  );
}

export default App;
