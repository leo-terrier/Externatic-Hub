import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
  jobFieldOptions,
  kmDistancesOptions,
} from "@assets/form-options/form-options";
import SearchLocationInput from "@components/frontandback/SearchLocationInput";
import { Slider } from "@mui/material";
import { addThousandSeparator } from "@services/utils";
import { useEffect, useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { RiPinDistanceLine } from "react-icons/ri";

export default function JobSearchForm({ handleSearch, offset }) {
  // form states
  const [queryStr, setQueryStr] = useState("");
  const [city, setCity] = useState("");
  const [geo, setGeo] = useState([]);
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

  const ref = useRef();

  const handleSubmit = () => {
    const filterObj = {
      queryStr,
      entrepriseSizes,
      jobFields,
      industries,
      compensation,
      minMaxRemoteDays,
      city,
      geo,
      distance,
    };

    const filterObjFinal = {};

    Object.keys(filterObj).forEach((elt) => {
      if (
        elt === "minMaxRemoteDays" &&
        minMaxRemoteDays[0] === 0 &&
        minMaxRemoteDays[1] === 5
      )
        return;
      if (elt === "distance" && !geo.length) return;
      if (filterObj[elt].length) {
        filterObjFinal[elt] = filterObj[elt];
      }
    });
    handleSearch(filterObjFinal);
  };

  const closeDistanceOnBlur = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDistancesOpen(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [offset]);

  useEffect(() => {
    document.addEventListener("mousedown", closeDistanceOnBlur);
    return () => document.removeEventListener("mousedown", closeDistanceOnBlur);
  }, []);

  return (
    <div>
      <form className="mt-20 flex flex-col items-center">
        <h1>Quel emploi recherchez-vous ? </h1>
        <div className="w-[1000px] flex-col gap-12 justify-center">
          <div className="flex h-12">
            <input
              value={queryStr}
              className="w-3/4 h-full"
              type="text"
              onChange={(e) => setQueryStr(e.target.value)}
              placeholder="Intitulé du poste, Technos utilisée, Entreprise ..."
            />
            <div className="w-1/4 h-[47.5px] flex items-center">
              <SearchLocationInput
                city={city}
                setCity={setCity}
                setGeo={setGeo}
                tailwindClasses="w-full h-[47.5px] ml-1"
              />
              {geo.length > 0 && (
                <button
                  ref={ref}
                  type="button"
                  className="ml-[-40px] h-3/4 rounded p-1 flex items-center justify-center relative"
                  onClick={() => setIsDistancesOpen(true)}
                >
                  <div className="hover:text-blue-700">
                    <RiPinDistanceLine size="1.8em" color="inherit" />
                  </div>
                  {isDistancesOpen && (
                    <div className="absolute top-full w-40 h-52 bg-white  border-gray-300 border-2 flex flex-col items-center justify-between">
                      {kmDistancesOptions.map((kmDistance) => {
                        return (
                          <div
                            className={`flex items-center justify-center w-full h-full hover:bg-slate-400 ${
                              distance === kmDistance
                                ? "bg-slate-300"
                                : "bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name="distances"
                              className="hidden"
                              id={kmDistance}
                              value={kmDistance}
                              checked={distance === kmDistance}
                              onChange={() => setDistance(kmDistance)}
                            />
                            <label
                              htmlFor={kmDistance}
                              className="text-sm font-medium text-gray-900 ml-2 block cursor-pointer"
                            >
                              {`À moins de ${kmDistance} km`}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </button>
              )}
            </div>
            <button
              type="button"
              className="ml-2 h-full right-[-100px] text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
          <div className="flex flex-col mx-auto my-12 border-y-4 border-double justify-center w-1/2  p-4">
            <div
              className={`overflow-hidden `}
              style={
                isFiltersOpen
                  ? {
                      maxHeight: "100rem",
                      transition: "max-height 0.35s linear",
                    }
                  : {
                      maxHeight: "0rem",
                      transition: "max-height 0.35s linear",
                    }
              }
            >
              <div className=" border-t-2 flex flex-col items-center w-full p-2 mb-4 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEntrepriseSizeOpen((prev) => !prev);
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={`duration-3500 transition-transform ${
                        isEntrepriseSizeOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BsChevronRight />
                    </div>
                    <h3 className="transition-transform m-0">
                      Taille de l'entreprise
                    </h3>
                  </div>
                </button>
                <div
                  style={
                    isEntrepriseSizeOpen
                      ? {
                          maxHeight: "30rem",
                          transition: "max-height 0.35s ease-in",
                        }
                      : {
                          maxHeight: "0rem",
                          transition: "max-height 0.35s ease-out",
                        }
                  }
                  className="flex-col overflow-hidden"
                >
                  {entrepriseSizeOptions.map((sizeName) => {
                    const exists = entrepriseSizes.indexOf(sizeName) !== -1;
                    return (
                      <div className="flex gap-2">
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
              <div className=" border-t-2 flex flex-col items-center w-full p-2 mb-4 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();

                    setIsEntrepriseIndustryOpen((prev) => !prev);
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={`duration-3500 transition-transform ${
                        isEntrepriseIndustryOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BsChevronRight />
                    </div>
                    <h3 className="transition-transform m-0">Secteur(s):</h3>
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
                  className="flex-col overflow-hidden"
                >
                  {entrepriseIndustryOptions.map((industryName) => {
                    const exists = industries.indexOf(industryName) !== -1;
                    return (
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id={industryName}
                          checked={exists}
                          onChange={() =>
                            setIndustries(
                              exists
                                ? industries.filter(
                                    (elt) => elt !== industryName
                                  )
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
              <div className=" border-t-2 flex flex-col items-center w-full p-2 mb-4 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsJobFieldOpen((prev) => !prev);
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={`duration-3500 transition-transform ${
                        isJobFieldOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BsChevronRight />
                    </div>
                    <h3 className="transition-transform m-0">Domaine:</h3>
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
                  className="flex-col overflow-hidden"
                >
                  {jobFieldOptions.slice(1).map((jobFieldName) => {
                    const exists = jobFields.indexOf(jobFieldName) !== -1;
                    return (
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id={jobFieldName}
                          checked={exists}
                          onChange={() =>
                            setJobFields(
                              exists
                                ? jobFields.filter(
                                    (elt) => elt !== jobFieldName
                                  )
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
              <div className=" border-t-2 flex flex-col items-center w-full p-2 mb-4 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCompensationOpen((prev) => !prev);
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={`duration-3500 transition-transform ${
                        isCompensationOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BsChevronRight />
                    </div>
                    <h3 className="transition-transform m-0">Salaire</h3>
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
                  className="flex-col overflow-hidden"
                >
                  <div className="flex gap-2">
                    <label htmlFor="compensationAsked">
                      Salaire souhaité (brut annuel) :
                    </label>
                    <span>
                      <input
                        id="compensationAsked"
                        className="text-right"
                        type="text"
                        value={addThousandSeparator(compensation)}
                        onChange={(e) =>
                          setCompensation(e.target.value.replace(/[^0-9]/g, ""))
                        }
                      />{" "}
                      €
                    </span>
                    {/* https://stackoverflow.com/questions/2913236/html-text-input-field-with-currency-symbol */}
                  </div>
                </div>
              </div>
              <div className=" border-t-2 flex flex-col items-center w-full p-2 mb-4 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRemoteDaysOpen((prev) => !prev);
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={`duration-3500 transition-transform ${
                        isRemoteDaysOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BsChevronRight />
                    </div>
                    <h3 className="transition-transform m-0">Teletravail</h3>
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
                  className="w-full overflow-hidden flex flex-col justify-center items-center"
                >
                  <div>
                    <label htmlFor="remote_days">
                      Nombre de jours de télétravail par semaine
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
                      sx={{ width: "70%", mx: "auto", my: "40px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsFiltersOpen(!isFiltersOpen);
              }}
              className="font-semibold m-2 font-slate-800 "
            >
              {isFiltersOpen ? "MOINS" : "PLUS"} DE CRITERES
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
