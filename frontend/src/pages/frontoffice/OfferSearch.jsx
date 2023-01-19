import { Pagination } from "@mui/material";
import { fetchAPIData } from "@services/APIcall";
import { useState } from "react";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import OfferCard from "@components/frontoffice/OfferCard";
import OfferSearchForm from "@components/frontoffice/OfferSearchForm";

export default function OfferSearch() {
  const [jobListings, setJobListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalOfferCount, setTotalOfferCount] = useState(null);

  const offset = (pageNumber - 1) * 10;

  const handleSearch = async (queryObj) => {
    const limit = 10;
    const dataPath = "offers";
    const [jobs, offerCount] = await fetchAPIData(
      queryObj,
      limit,
      offset,
      dataPath
    );
    setJobListings(jobs);
    setTotalOfferCount(offerCount[0].totalCount);
  };

  return (
    <div className="jobSearchDiv flex flex-col gap-12 w-full">
      <OfferSearchForm offset={offset} handleSearch={handleSearch} />
      <div className="w-full sm:w-10/12 mx-auto">
        <Listings>
          {jobListings.map((job) => (
            <Listing key={job.id}>
              <OfferCard job={job} />
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
        />
      </div>
    </div>
  );
}
