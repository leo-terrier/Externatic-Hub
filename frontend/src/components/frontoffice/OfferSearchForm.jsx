import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
  jobFieldOptions,
} from "@assets/form-options/form-options";
import { Modal, Slider, Zoom } from "@mui/material";
import { addThousandSeparator, toggleLikeAccordion } from "@services/utils";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import OfferSearchAppliedFilters from "./OfferSearchAppliedFilters";
import OfferSearchLocationInput from "./OfferSearchLocationInput";

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

  // Open filters states
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isEntrepriseSizeOpen, setIsEntrepriseSizeOpen] = useState(false);
  const [isEntrepriseIndustryOpen, setIsEntrepriseIndustryOpen] =
    useState(false);
  const [isJobFieldOpen, setIsJobFieldOpen] = useState(false);
  const [isCompensationOpen, setIsCompensationOpen] = useState(false);
  const [isRemoteDaysOpen, setIsRemoteDaysOpen] = useState(false);
  const [isDistancesOpen, setIsDistancesOpen] = useState(false);

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

  const filterStatesArr = [
    ["isEntrepriseSizeOpen", isEntrepriseSizeOpen, setIsEntrepriseSizeOpen],
    [
      "isEntrepriseIndustryOpen",
      isEntrepriseIndustryOpen,
      setIsEntrepriseIndustryOpen,
    ],
    ["isJobFieldOpen", isJobFieldOpen, setIsJobFieldOpen],
    ["isCompensationOpen", isCompensationOpen, setIsCompensationOpen],
    ["isRemoteDaysOpen", isRemoteDaysOpen, setIsRemoteDaysOpen],
    ["isDistancesOpen", isDistancesOpen, setIsDistancesOpen],
  ];

  useEffect(() => {
    handleSubmit();
  }, [offset]);

  return (
    <form className="flex flex-col items-center w-full gap-8">
      <h1 className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-center">
        Quel emploi recherchez-vous ?
      </h1>
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
          />
        </div>
        <button
          type="button"
          className="h-[50px] right-[-100px] text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Search
        </button>
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
      <button
        type="button"
        onClick={() => {
          setIsFiltersOpen(!isFiltersOpen);
        }}
        className="hover:text-blue-700 font-semibold m-2 font-slate-800 w-fit underline underline-offset-2"
      >
        PLUS DE CRITERES
      </button>
      <Modal
        open={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          overflowY: "scroll",
          margin: "20px 0",
        }}
      >
        <Zoom in={isFiltersOpen}>
          <div className="border-2 bg-white w-10/12 max-w-[400px]">
            <div className="flex flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() =>
                  toggleLikeAccordion(filterStatesArr, "isEntrepriseSizeOpen")
                }
                className="hover:text-rose-600"
              >
                <div className="flex gap-1 items-center relative">
                  <div
                    className={`absolute left-[-35px] duration-3500 transition-transform ${
                      isEntrepriseSizeOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <BiChevronRight size="2em" />
                  </div>
                  <h3 className="m-0 text-inherit">Taille de l'entreprise</h3>
                </div>
              </button>
              <div
                style={
                  isEntrepriseSizeOpen
                    ? {
                        maxHeight: "30rem",
                        transition: "max-height 0.3s ease-in",
                      }
                    : {
                        maxHeight: "0rem",
                        transition: "max-height 0.3s ease-out",
                      }
                }
                className="flex-col overflow-hidden"
              >
                {entrepriseSizeOptions.map((sizeName, i) => {
                  const exists = entrepriseSizes.indexOf(sizeName) !== -1;
                  return (
                    <div
                      className={`flex gap-2 ${
                        i === 0
                          ? "mt-[10px]"
                          : i === entrepriseSizeOptions.length - 1
                          ? "mb-[10px]"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={sizeName}
                        checked={exists}
                        onChange={() =>
                          setEntrepriseSizes(
                            exists
                              ? entrepriseSizes.filter(
                                  (elt) => elt !== sizeName
                                )
                              : [...entrepriseSizes, sizeName]
                          )
                        }
                      />
                      <label htmlFor={sizeName}>{sizeName}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex border-t-2 border-black flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() => {
                  toggleLikeAccordion(
                    filterStatesArr,
                    "isEntrepriseIndustryOpen"
                  );
                }}
                className="hover:text-rose-600"
              >
                <div className="relative flex gap-1 items-center">
                  <div
                    className={`absolute left-[-35px] duration-3500 transition-transform ${
                      isEntrepriseIndustryOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <BiChevronRight size="2em" />
                  </div>
                  <h3 className="m-0 text-inherit">Secteur</h3>
                </div>
              </button>
              <div
                style={
                  isEntrepriseIndustryOpen
                    ? {
                        maxHeight: "30rem",
                        transition: "max-height 0.35s ease-in",
                      }
                    : {
                        maxHeight: "0rem",
                        transition: "max-height 0.35s ease-out",
                      }
                }
                className="overflow-hidden"
              >
                {entrepriseIndustryOptions.map((industryName, i) => {
                  const exists = industries.indexOf(industryName) !== -1;
                  return (
                    <div
                      className={`flex gap-2 ${
                        i === 0
                          ? "mt-[10px]"
                          : i === entrepriseIndustryOptions.length - 1
                          ? "mb-[10px]"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={industryName}
                        checked={exists}
                        onChange={() =>
                          setIndustries(
                            exists
                              ? industries.filter((elt) => elt !== industryName)
                              : [...industries, industryName]
                          )
                        }
                      />
                      <label htmlFor={industryName}>{industryName}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex border-t-2 border-black flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() => {
                  toggleLikeAccordion(filterStatesArr, "isJobFieldOpen");
                }}
                className="hover:text-rose-600"
              >
                <div className="relative flex gap-1 items-center">
                  <div
                    className={`absolute left-[-35px] duration-3500 transition-transform ${
                      isJobFieldOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <BiChevronRight size="2em" />
                  </div>
                  <h3 className="m-0 text-inherit">Domaine</h3>
                </div>
              </button>
              <div
                style={
                  isJobFieldOpen
                    ? {
                        maxHeight: "30rem",
                        transition: "max-height 0.35s ease-in",
                      }
                    : {
                        maxHeight: "0rem",
                        transition: "max-height 0.35s ease-out",
                      }
                }
                className="overflow-hidden"
              >
                {jobFieldOptions.slice(1).map((jobFieldName, i) => {
                  const exists = jobFields.indexOf(jobFieldName) !== -1;
                  return (
                    <div
                      className={`flex gap-2 ${
                        i === 0
                          ? "mt-[10px]"
                          : i === entrepriseIndustryOptions.length - 1
                          ? "mb-[10px]"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={jobFieldName}
                        checked={exists}
                        onChange={() =>
                          setJobFields(
                            exists
                              ? jobFields.filter((elt) => elt !== jobFieldName)
                              : [...jobFields, jobFieldName]
                          )
                        }
                      />
                      <label htmlFor={jobFieldName}>{jobFieldName}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex border-t-2 border-black flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() => {
                  toggleLikeAccordion(filterStatesArr, "isCompensationOpen");
                }}
                className="hover:text-rose-600"
              >
                <div className="relative flex gap-1 items-center">
                  <div
                    className={`absolute left-[-35px] duration-3500 transition-transform ${
                      isCompensationOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <BiChevronRight size="2em" />
                  </div>
                  <h3 className="m-0 text-inherit">Salaire</h3>
                </div>
              </button>
              <div
                style={
                  isCompensationOpen
                    ? {
                        maxHeight: "30rem",
                        transition: "max-height 0.35s ease-in",
                      }
                    : {
                        maxHeight: "0rem",
                        transition: "max-height 0.35s ease-out",
                      }
                }
                className="overflow-hidden"
              >
                <div className="flex gap-4 my-[10px] items-center">
                  <label htmlFor="compensationAsked" className="text-center">
                    Salaire brut annuel :
                  </label>
                  <span>
                    <input
                      id="compensationAsked"
                      className="w-[150px] mr-1"
                      type="text"
                      value={addThousandSeparator(compensation)}
                      onChange={(e) =>
                        setCompensation(e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </span>
                  {/* https://stackoverflow.com/questions/2913236/html-text-input-field-with-currency-symbol */}
                </div>
              </div>
            </div>
            <div className="flex border-t-2 border-black flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() => {
                  toggleLikeAccordion(filterStatesArr, "isRemoteDaysOpen");
                }}
                className="hover:text-rose-600"
              >
                <div className="flex gap-1 items-center relative">
                  <div
                    className={`absolute left-[-35px] duration-3500 transition-transform ${
                      isRemoteDaysOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <BiChevronRight size="2em" />
                  </div>
                  <h3 className="m-0 text-inherit">Teletravail</h3>
                </div>
              </button>
              <div
                style={
                  isRemoteDaysOpen
                    ? {
                        maxHeight: "30rem",
                        transition: "max-height 0.35s ease-in",
                      }
                    : {
                        maxHeight: "0rem",
                        transition: "max-height 0.35s ease-out",
                      }
                }
                className="overflow-hidden"
              >
                <div className="my-[10px]">
                  <label htmlFor="remote_days">
                    Nombre de jours de télétravail par semaine :
                  </label>
                </div>
                <div className="w-full flex justify-center">
                  <Slider
                    id="remote_days"
                    value={minMaxRemoteDays}
                    onChange={(_, newValue) => setMinMaxRemoteDays(newValue)}
                    valueLabelDisplay="auto"
                    marks
                    max={5}
                    min={0}
                    step={1}
                    sx={{ width: "70%", mx: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Zoom>
      </Modal>
    </form>
  );
}
