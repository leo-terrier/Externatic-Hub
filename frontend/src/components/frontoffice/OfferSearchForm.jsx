import Underline from "@components/frontandback/Underline";
import { UserInfoContext } from "@components/frontandback/UserContext";
import FrontButton from "@pages/frontoffice/FrontButton";
import { modifyUserSearchPreferences } from "@services/APIcall";
import {
  applySearchPreferencesToCurrentFiltersNotification,
  makeFiltersSearchPreferencesNotification,
  requiredLoginNotification,
} from "@services/notificationStore";
import { fetchSearchPreferencesAndApplyToState } from "@services/utils";
import { useContext, useEffect, useRef, useState } from "react";
import OfferSearchAppliedFilters from "./OfferSearchAppliedFilters";
import OfferSearchLocationInput from "./OfferSearchLocationInput";
import SearchPreferenceAccordionModal from "./SearchPreferenceAccordionModal";

export default function OfferSearchForm({
  handleSearch,
  pageNumber,
  setPageNumber,
}) {
  const { userInfo } = useContext(UserInfoContext);

  // Retreive previous params
  const queryStrSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.queryStrSession;
  const citySession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.citySession;
  const geopointsSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.geopointsSession;
  const entrepriseSizesSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.entrepriseSizesSession;
  const jobFieldsSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.jobFieldsSession;
  const industriesSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.industriesSession;
  const compensationSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.compensationSession;
  const minMaxRemoteDaysSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.minMaxRemoteDaysSession;
  const distanceSession = JSON.parse(
    window.sessionStorage.getItem("searchDetails")
  )?.distanceSession;

  // form states
  const [queryStr, setQueryStr] = useState(queryStrSession || "");
  const [city, setCity] = useState(citySession || "");
  const [geopoints, setGeopoints] = useState(geopointsSession || []);
  const [entrepriseSizes, setEntrepriseSizes] = useState(
    entrepriseSizesSession || []
  );
  const [jobFields, setJobFields] = useState(jobFieldsSession || []);
  const [industries, setIndustries] = useState(industriesSession || []);
  const [compensation, setCompensation] = useState(compensationSession || "");
  const [minMaxRemoteDays, setMinMaxRemoteDays] = useState(
    minMaxRemoteDaysSession || [0, 5]
  );
  const [distance, setDistance] = useState(distanceSession || "10");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDistancesOpen, setIsDistancesOpen] = useState(false);

  const OfferSearchFormCompleteRef = useRef(null);

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

  const handleSubmit = () => {
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

    window.sessionStorage.setItem(
      "searchDetails",
      JSON.stringify({
        queryStrSession: queryStr,
        entrepriseSizesSession: entrepriseSizes,
        jobFieldsSession: jobFields,
        industriesSession: industries,
        compensationSession: compensation,
        minMaxRemoteDaysSession: minMaxRemoteDays,
        citySession: city,
        geopointsSession: geopoints,
        distanceSession: distance,
      })
    );
    console.log("geopoints");
    console.log(geopoints);
  };

  const handleNewSearch = () => {
    setPageNumber(1);
    handleSubmit();
  };

  const makeCurrentFiltersSearchPreferences = () => {
    if (userInfo.id) {
      const payload = {
        queryStr,
        city,
        jobFields,
        entrepriseSizes,
        industries,
        compensation,
        minMaxRemoteDays,
        distance,
        geopoints,
      };
      modifyUserSearchPreferences(payload, userInfo.id);
      makeFiltersSearchPreferencesNotification();
    } else {
      requiredLoginNotification();
    }
  };

  const applySearchPreferencesToCurrenFilters = async () => {
    if (userInfo.id) {
      await fetchSearchPreferencesAndApplyToState(
        userInfo.id,
        setQueryStr,
        setCity,
        setJobFields,
        setEntrepriseSizes,
        setIndustries,
        setCompensation,
        setMinMaxRemoteDays,
        setGeopoints,
        setDistance
      );
      applySearchPreferencesToCurrentFiltersNotification();
    } else {
      requiredLoginNotification();
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [pageNumber]);

  return (
    <form className="flex flex-col items-center w-full gap-8">
      <div className="flex flex-col gap-2 w-full sm:flex-row">
        <input
          value={queryStr}
          className="w-full h-[50px] sm:w-8/12 "
          type="text"
          onChange={(e) => setQueryStr(e.target.value)}
          placeholder="Intitulé du poste, Technos utilisée, Entreprise ..."
        />
        <div className="w-full sm:w-3/12 relative">
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
            placeholder="Ville"
          />
        </div>
        <FrontButton content="CHERCHER" onClick={handleNewSearch} />
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
      <div className="flex justify-center gap-8 text-zinc-700 text-sm font-semibold">
        <button
          type="button"
          className=""
          onClick={makeCurrentFiltersSearchPreferences}
        >
          <Underline>Définir comme critère de recherche</Underline>
        </button>

        <button
          type="button"
          className=""
          onClick={applySearchPreferencesToCurrenFilters}
        >
          <Underline>Appliquer mes critères de recherche</Underline>
        </button>
      </div>

      <FrontButton
        onClick={() => {
          setIsFiltersOpen(!isFiltersOpen);
        }}
        tailwindClasses=" m-2"
        content="PLUS DE CRITERES"
        buttonType="secondary"
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
