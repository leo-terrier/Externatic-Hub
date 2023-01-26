import { Pagination } from "@mui/material";
import { fetchAPIData } from "@services/APIcall";
import { useState } from "react";
import Listing from "@components/frontandback/Listing";
import EntrepriseCard from "@components/frontoffice/EntrepriseCard";
import EntrepriseSearchForm from "@components/frontoffice/EntrepriseSearchForm";
import Listings from "@components/frontandback/Listings";

export default function EntrepriseSearch() {
  const [entrepriseListings, setEntrepriseListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalEntrepriseCount, setTotalEntrepriseCount] = useState(null);

  const offset = (pageNumber - 1) * 10;

  const handleSearch = async (queryObj) => {
    const dataPath = "entreprises";
    const limit = 10;
    const [entreprises, entrepriseCount] = await fetchAPIData(
      queryObj,
      limit,
      offset,
      dataPath
    );
    setEntrepriseListings(entreprises);
    setTotalEntrepriseCount(entrepriseCount[0].totalCount);
  };

  return (
    <div className="entrepriseSearchDiv flex flex-col gap-12 w-full">
      <EntrepriseSearchForm offset={offset} handleSearch={handleSearch} />
      <div className="w-full sm:w-10/12 mx-auto">
        <Listings>
          {entrepriseListings.map((entreprise) => (
            <Listing key={entreprise.id}>
              <EntrepriseCard entreprise={entreprise} />
            </Listing>
          ))}
        </Listings>
      </div>
      <div
        className={`w-full flex justify-center ${
          totalEntrepriseCount < 10 ? "hidden" : ""
        }`}
      >
        <Pagination
          count={Math.ceil(totalEntrepriseCount / 10)}
          onChange={(_, value) => {
            setPageNumber(value);
          }}
        />
      </div>
    </div>
  );
}
