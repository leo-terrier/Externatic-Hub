import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
} from "@assets/form-options/form-options";
import { Modal, Zoom } from "@mui/material";
import { toggleLikeAccordion } from "@services/utils";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import EntrepriseSearchAppliedFilters from "./EntrepriseSearchAppliedFilters";

export default function EntrepriseSearchForm({ handleSearch, offset }) {
  // FORM STATE
  const [queryStr, setQueryStr] = useState("");
  const [entrepriseSizes, setEntrepriseSizes] = useState([]);
  const [industries, setIndustries] = useState([]);

  // OPEN FILTER STATE
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isEntrepriseSizeOpen, setIsEntrepriseSizeOpen] = useState(false);
  const [isEntrepriseIndustryOpen, setIsEntrepriseIndustryOpen] =
    useState(false);

  const handleSubmit = () => {
    const filterObj = { queryStr, entrepriseSizes, industries };
    const payload = {};
    Object.keys(filterObj).forEach((property) => {
      if (filterObj[property]) payload[property] = filterObj[property];
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
  ];

  useEffect(() => {
    handleSubmit();
  }, [offset]);

  return (
    <form className="flex flex-col items-center  w-full gap-8">
      <h1 className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-center">
        Recherche d'entreprise
      </h1>
      <div className="flex flex-col gap-2 w-full sm:flex-row">
        <input
          value={queryStr}
          className="w-full h-[50px]"
          type="text"
          onChange={(e) => setQueryStr(e.target.value)}
          placeholder="Nom de l'entreprise, secteur, description,  etc..."
        />
        <button
          type="button"
          className="h-[50px] right-[-100px] text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <EntrepriseSearchAppliedFilters
        entrepriseSizes={entrepriseSizes}
        setEntrepriseSizes={setEntrepriseSizes}
        industries={industries}
        setIndustries={setIndustries}
      />
      <button
        type="button"
        onClick={() => {
          setIsFiltersOpen(!isFiltersOpen);
        }}
        className="hover:text-blue-700 font-semibold m-2 font-slate-800 underline underline-offset-2"
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
          <div className="border-2 h-auto bg-white w-10/12 max-w-[400px]">
            <div className="flex flex-col items-center w-full p-4">
              <button
                type="button"
                onClick={() => {
                  toggleLikeAccordion(filterStatesArr, "isEntrepriseSizeOpen");
                }}
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
                  <h3 className="text-inherit m-0">Taille de l'entreprise</h3>
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
                className="overflow-hidden"
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
                  <h3 className="text-inherit m-0">Secteur</h3>
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
          </div>
        </Zoom>
      </Modal>
    </form>
  );
}
