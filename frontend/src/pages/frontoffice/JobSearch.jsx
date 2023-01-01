import FrontOfficeListing from "@components/frontoffice/FrontOfficeListing";
import FrontOfficeListings from "@components/frontoffice/FrontOfficeListings";
import JobCard from "@components/frontoffice/JobCard";
import JobSearchForm from "@components/frontoffice/JobSearchForm";
import { Pagination } from "@mui/material";
import { getOffers } from "@services/APIcall";
import { useState } from "react";

export default function JobSearch() {
  const [jobListings, setJobListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalOfferCount, setTotalOfferCount] = useState(1);

  const limit = 10;
  const offset = (pageNumber - 1) * 10;

  const handleSearch = async (queryObj) => {
    const [jobs, offerCount] = await getOffers(queryObj, limit, offset);
    setJobListings(
      jobs.map((job) => {
        return {
          id: job.id,
          date: job.date,
          title: job.title,
          entreprise_name: job.entreprise_name,
          min_compensation: job.min_compensation,
          max_compensation: job.max_compensation,
        };
      })
    );
    setTotalOfferCount(offerCount[0].offercount);
  };

  return (
    <div className="space-y-16">
      <JobSearchForm offset={offset} handleSearch={handleSearch} />
      <div className="min-h-[1450px]">
        <FrontOfficeListings>
          {jobListings.map((job) => (
            <FrontOfficeListing>
              <JobCard key={job.id} job={job} />
            </FrontOfficeListing>
          ))}
        </FrontOfficeListings>
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
