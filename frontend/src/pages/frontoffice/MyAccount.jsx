import { UserInfoContext } from "@components/frontandback/UserContext";
import Propositions from "@components/frontoffice/accountNav/Propositions";
import AccountNavButton from "@components/frontoffice/AccountNavButton";
import { logout } from "@services/APIcall";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Applications from "../../components/frontoffice/accountNav/Applications";
import FavoriteOffers from "../../components/frontoffice/accountNav/FavoriteOffers";
import PersonalInfo from "../../components/frontoffice/accountNav/PersonalInfo";
import Resume from "../../components/frontoffice/accountNav/Resume";
import SearchPreferences from "../../components/frontoffice/accountNav/SearchPreferences";
import FrontButton from "./FrontButton";

export default function MyAccount() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(
    "Mes informations personnelles"
  );

  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  console.log("userInfo");
  console.log(userInfo);

  useEffect(() => {
    if (!Object.keys(userInfo).length) navigate("../login");
  });

  const accountNav = {
    "Mes informations personnelles": <PersonalInfo />,
    "Mes préférences de recherches": <SearchPreferences />,
    "Mon CV": <Resume />,
    "Mes offres sauvegardées": <FavoriteOffers />,
    "Mes candidatures": <Applications />,
    "Mes Propositions": <Propositions />,
  };

  const accountNavKeys = Object.keys(accountNav);

  const handleLogout = () => {
    logout();
    setUserInfo({});
    navigate("/");
  };

  return (
    <div className="min-h-screen max-w-[1100px] mx-auto">
      <h1 className="border-b-4 mb-0 "> Mon compte</h1>
      <div className="flex min-h-full  bg-slate-200 w-full  pb-12 pt-6 bg-slate-200">
        <aside>
          <ul className=" w-48 text-center">
            {accountNavKeys.map((property, i) => {
              const isLast = accountNavKeys.length - 1 === i;
              return (
                <li key={property}>
                  <AccountNavButton
                    propertyName={property}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    isLast={isLast}
                  />
                </li>
              );
            })}
          </ul>
        </aside>
        <section className="w-full bg-white shadow p-12">
          {accountNav[selectedTab]}
        </section>
      </div>
      <div className="flex justify-center">
        <FrontButton
          onClick={handleLogout}
          content="Se déconnecter"
          isPrimary
        />
      </div>
    </div>
  );
}
