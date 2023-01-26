import FrontButton from "@pages/frontoffice/FrontButton";
import { useEffect, useRef, useState } from "react";
import OfferSearchAppliedFilters from "./OfferSearchAppliedFilters";
import OfferSearchLocationInput from "./OfferSearchLocationInput";
import SearchPreferenceAccordionModal from "./SearchPreferenceAccordionModal";

export default function OfferSearchForm({ handleSearch, offset }) {
  // form states
  const [queryStr, setQueryStr] = useState("");
  const [city, setCity] = useState("");
  const [geopoints, setGeopoints] = useState([]);
  const [entrepriseSizes, setEntrepriseSizes] = useState([]);
  const [jobFields, setJobFields] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [compensation, setCompensation] = useState("");
  const [minMaxRemoteDays, setMinMaxRemoteDays] = useState([0, 5]);
  const [distance, setDistance] = useState("10");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDistancesOpen, setIsDistancesOpen] = useState(false);

  const OfferSearchFormCompleteRef = useRef(null);

  const handleSubmit = () => {
    const filterObj = {
      queryStr,
      entrepriseSizes,
      jobFields,
      industries,
      compensation,
      minMaxRemoteDays,
      city,
      geopoints,
      distance,
    };

    const payload = {};

    Object.keys(filterObj).forEach((elt) => {
      if (
        elt === "minMaxRemoteDays" &&
        minMaxRemoteDays[0] === 0 &&
        minMaxRemoteDays[1] === 5
      )
        return;
      if (elt === "distance" && !geopoints.length) return;
      if (filterObj[elt].length) {
        payload[elt] = filterObj[elt];
      }
    });
    handleSearch(payload);
  };

  useEffect(() => {
    handleSubmit();
  }, [offset]);

  return (
    <form className="flex flex-col items-center w-full gap-8">
      <div className="flex flex-col gap-2 w-full sm:flex-row">
        <input
          value={queryStr}
          className="w-full h-[50px] sm:w-3/4 "
          type="text"
          onChange={(e) => setQueryStr(e.target.value)}
          placeholder="Intitulé du poste, Technos utilisée, Entreprise ..."
        />
        <div className="w-full sm:w-1/4 relative">
          <OfferSearchLocationInput
            geopoints={geopoints}
            city={city}
            setCity={setCity}
            setGeopoints={setGeopoints}
            isDistancesOpen={isDistancesOpen}
            setIsDistancesOpen={setIsDistancesOpen}
            distance={distance}
            setDistance={setDistance}
            autoCompleteRef={OfferSearchFormCompleteRef}
          />
        </div>
        <FrontButton
          type="button"
          isPrimary
          content="CHERCHER"
          onClick={handleSubmit}
        />
      </div>
      <OfferSearchAppliedFilters
        city={city}
        entrepriseSizes={entrepriseSizes}
        jobFields={jobFields}
        industries={industries}
        compensation={compensation}
        minMaxRemoteDays={minMaxRemoteDays}
        geopoints={geopoints}
        setCity={setCity}
        setGeopoints={setGeopoints}
        setEntrepriseSizes={setEntrepriseSizes}
        setJobFields={setJobFields}
        setIndustries={setIndustries}
        setCompensation={setCompensation}
        setMinMaxRemoteDays={setMinMaxRemoteDays}
      />
      <FrontButton
        type="button"
        onClick={() => {
          setIsFiltersOpen(!isFiltersOpen);
        }}
        tailwindClasses=" m-2 "
        content="PLUS DE CRITERES"
      />
      <SearchPreferenceAccordionModal
        setEntrepriseSizes={setEntrepriseSizes}
        entrepriseSizes={entrepriseSizes}
        setIndustries={setIndustries}
        industries={industries}
        jobFields={jobFields}
        setJobFields={setJobFields}
        compensation={compensation}
        setCompensation={setCompensation}
        minMaxRemoteDays={minMaxRemoteDays}
        setMinMaxRemoteDays={setMinMaxRemoteDays}
        isInMyAccount={false}
        isFiltersOpen={isFiltersOpen}
        setIsFiltersOpen={setIsFiltersOpen}
      />
    </form>
  );
}
