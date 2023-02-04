import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import OfferCard from "@components/frontoffice/OfferCard";
import OfferSearchForm from "@components/frontoffice/OfferSearchForm";
import { Pagination } from "@mui/material";
import { fetchAPIData } from "@services/APIcall";
import { useEffect, useState } from "react";

export default function OfferSearch() {
  // Retreive previous page
  const pageNumberSession = JSON.parse(
    window.sessionStorage.getItem("pageNumber")
  )?.pageNumberSession;

  const [offerListings, setOfferListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(pageNumberSession || 1);
  const [totalOfferCount, setTotalOfferCount] = useState(null);

  const handleSearch = async (queryObj) => {
    const offset = (pageNumber - 1) * 10;
    const limit = 10;
    const dataPath = "offers";
    const [offers, offerCount] = await fetchAPIData(
      queryObj,
      limit,
      offset,
      dataPath
    );
    setOfferListings(offers);
    setTotalOfferCount(offerCount[0].totalCount);

    window.sessionStorage.setItem(
      "pageNumber",
      JSON.stringify({
        pageNumberSession: pageNumber,
      })
    );
  };

  useEffect(() => {
    console.log(pageNumber);
  }, []);

  return (
    <div className="jobSearchDiv flex flex-col gap-12 w-full">
      <h1 className="text-3xl sm:text-4xl mb-2 sm:mb-4 text-center">
        Quel emploi recherchez-vous ?
      </h1>
      <OfferSearchForm
        pageNumber={pageNumber}
        handleSearch={handleSearch}
        setPageNumber={setPageNumber}
      />
      <div className="w-full sm:w-10/12 mx-auto">
        <Listings>
          {offerListings.map((offer) => (
            <Listing key={offer.id}>
              <OfferCard offer={offer} />
            </Listing>
          ))}
        </Listings>
      </div>
      <div
        className={`flex justify-center ${
          totalOfferCount < 10 ? "hidden" : ""
        }`}
      >
        <Pagination
          count={Math.ceil(totalOfferCount / 10)}
          onChange={(_, value) => {
            setPageNumber(value);
          }}
          page={pageNumber}
        />
      </div>
    </div>
  );
}
