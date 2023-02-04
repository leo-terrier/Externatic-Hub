import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
  jobFieldOptions,
} from "@assets/form-options/form-options";
import { UserInfoContext } from "@components/frontandback/UserContext";
import { Modal, Slider, Zoom } from "@mui/material";
import { addThousandSeparator, toggleLikeAccordion } from "@services/utils";
import { BiChevronRight } from "react-icons/bi";

import { modifyUserSearchPreferences } from "@services/APIcall";
import { useContext, useRef, useState } from "react";
import OfferSearchLocationInput from "./OfferSearchLocationInput";

export default function SearchPreferenceAccordionModal({
  setEntrepriseSizes,
  entrepriseSizes,
  setIndustries,
  industries,
  jobFields,
  setJobFields,
  compensation,
  setCompensation,
  minMaxRemoteDays,
  setMinMaxRemoteDays,
  isInMyAccount,
  city,
  setCity,
  queryStr,
  setQueryStr,
  geopoints,
  setGeopoints,
  distance,
  setDistance,
  isFiltersOpen,
  setIsFiltersOpen,
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isQueryStrOpen, setIsQueryStrOpen] = useState(false);
  const [isEntrepriseSizeOpen, setIsEntrepriseSizeOpen] = useState(false);
  const [isEntrepriseIndustryOpen, setIsEntrepriseIndustryOpen] =
    useState(false);
  const [isJobFieldOpen, setIsJobFieldOpen] = useState(false);
  const [isCompensationOpen, setIsCompensationOpen] = useState(false);
  const [isRemoteDaysOpen, setIsRemoteDaysOpen] = useState(false);
  const [isDistancesOpen, setIsDistancesOpen] = useState(false);

  const { userInfo } = useContext(UserInfoContext);
  const { id: userId } = userInfo;

  const searchPreferenceCompleteRef = useRef(null);

  const filterStatesArr = [
    ["isLocationOpen", isLocationOpen, setIsLocationOpen],
    ["isQueryStrOpen", isQueryStrOpen, setIsQueryStrOpen],
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

  const changePreferences = () => {
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

    modifyUserSearchPreferences(payload, userId);
  };

  const handleDoneEditing = () => {
    if (isInMyAccount) changePreferences();
    setIsFiltersOpen(false);
  };

  return (
    <Modal
      open={isFiltersOpen}
      onClose={handleDoneEditing}
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
          {isInMyAccount && (
            <>
              <div className={`flex flex-col items-center w-full p-4 `}>
                <button
                  type="button"
                  onClick={() => {
                    toggleLikeAccordion(filterStatesArr, "isQueryStrOpen");
                  }}
                  className="hover:text-rose-600"
                >
                  <div className="relative flex gap-1 items-center">
                    <div
                      className={`absolute left-[-35px] duration-3500 transition-transform ${
                        isQueryStrOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BiChevronRight size="2em" />
                    </div>
                    <h3 className="m-0 text-inherit">Recherche</h3>
                  </div>
                </button>
                <div
                  style={
                    isQueryStrOpen
                      ? {
                          maxHeight: "30rem",
                          transition: "max-height 0.35s ease-in",
                        }
                      : {
                          maxHeight: "0rem",
                          transition: "max-height 0.35s ease-out",
                        }
                  }
                  className="overflow-hidden w-full"
                >
                  <div className="w-full flex items-center gap-4 justify-center my-4">
                    <label htmlFor="query">Mots clé : </label>
                    <input
                      value={queryStr}
                      className="max-w-[250px] h-[50px] sm:w-3/4 "
                      type="text"
                      onChange={(e) => setQueryStr(e.target.value)}
                      placeholder="Intitulé du poste, Technos utilisée, Entreprise ..."
                      id="query"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex border-t-2 border-black flex-col items-center w-full p-4 `}
              >
                <button
                  type="button"
                  onClick={() => {
                    toggleLikeAccordion(filterStatesArr, "isLocationOpen");
                  }}
                  className="hover:text-rose-600"
                >
                  <div className="relative flex gap-1 items-center">
                    <div
                      className={`absolute left-[-35px] duration-3500 transition-transform ${
                        isLocationOpen ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <BiChevronRight size="2em" />
                    </div>
                    <h3 className="m-0 text-inherit">Lieu</h3>
                  </div>
                </button>
                <div
                  style={
                    isLocationOpen
                      ? {
                          maxHeight: "30rem",
                          transition: "max-height 0.35s ease-in",
                        }
                      : {
                          maxHeight: "0rem",
                          transition: "max-height 0.35s ease-out",
                        }
                  }
                  className=""
                >
                  <div
                    className={`flex gap-2 items-center relative duration-300 transition-all	${
                      isLocationOpen ? "visible" : "invisible"
                    }`}
                  >
                    <label htmlFor="city">Ville : </label>
                    <OfferSearchLocationInput
                      geopoints={geopoints}
                      city={city}
                      setCity={setCity}
                      setGeopoints={setGeopoints}
                      isDistancesOpen={isDistancesOpen}
                      setIsDistancesOpen={setIsDistancesOpen}
                      distance={distance}
                      setDistance={setDistance}
                      autoCompleteRef={searchPreferenceCompleteRef}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div
            className={`flex flex-col ${
              isInMyAccount ? "border-t-2 border-black" : ""
            } items-center w-full p-4`}
          >
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
                            ? entrepriseSizes.filter((elt) => elt !== sizeName)
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
                    className="w-[150px]"
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
                  onChange={(_, newValue) =>
                    setMinMaxRemoteDays(newValue.toString())
                  }
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
  );
}
