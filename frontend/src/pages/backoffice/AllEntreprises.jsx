import {
  entrepriseIndustryOptions,
  entrepriseSizeOptions,
} from "@assets/form-options/form-options";
import EntrepriseCard from "@components/backoffice/EntrepriseCard";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import { Pagination } from "@mui/material";
import {
  createEntreprise,
  fetchAPIData,
  fetchDataFromTable,
} from "@services/APIcall";
import useWindowDimensions from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";

const config = "../../../tailwind.config";

export default function AllEntreprises() {
  const navigate = useNavigate();
  const tableRef = useRef();
  const [totalEntrepriseCount, setTotalEntrepriseCount] = useState(null);
  const dataPath = "entreprises";

  // For form (create entreprise)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");

  // For viewport change
  const { width } = useWindowDimensions();
  const fullConfig = resolveConfig(config);
  const mdBreakPoint = parseInt(
    fullConfig.theme.screens.md.replace("px", ""),
    10
  );
  const isSmallScreen = width < mdBreakPoint;

  // For small screens (Cards)
  const [queryStr, setQueryStr] = useState("");
  const [entreprises, setEntreprises] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * 10;

  const getData = () => {
    const limit = 10;
    const queryObj = {};
    if (queryStr) queryObj.queryStr = queryStr;

    fetchAPIData(queryObj, limit, offset, dataPath).then(
      ([res, entrepriseCount]) => {
        setEntreprises(res);
        setTotalEntrepriseCount(entrepriseCount[0].totalCount);
      }
    );
  };

  useEffect(() => {
    if (isSmallScreen) {
      console.log("small screen");
      getData();
    } else {
      tableRef.current.onQueryChange();
    }
  }, [width, offset]);

  // For medium screens (fetching from table)
  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      cellStyle: { width: "4%" },
      width: "4%",
      headerStyle: { width: "4%" },
      mySqlCol: "t1.id",
    },
    {
      title: "Nom",
      field: "name",
      /* cellStyle: { width: "15%" },
      width: "15%",
      headerStyle: { width: "15%" }, */
      mySqlCol: "t1.name",
    },
    {
      title: "Taille",
      field: "size",
      /* cellStyle: { width: "8%" },
      width: "8%",
      headerStyle: { width: "8%" },  */
      mySqlCol: "t1.size",
    },
    {
      title: "Secteur",
      field: "industry",
      /* cellStyle: { width: "15%" },
      width: "10%",
      headerStyle: { width: "15%" }, */
      mySqlCol: "t1.industry",
    },
    {
      title: "Offres actives",
      field: "nb_active_offers",
      /* cellStyle: { width: "10%" },
      width: "10%",
      headerStyle: { width: "10%" }, */
      mySqlCol: "nb_active_offers",
    },
    {
      title: "Offres pourvues",
      field: "nb_filled_offers",
      /* cellStyle: { width: "10%" },
      width: "10%",
      headerStyle: { width: "10%" }, */
      mySqlCol: "nb_filled_offers",
    },
    {
      title: "Offres non-pourvues",
      field: "nb_unfilled_offers",
      /* cellStyle: { width: "13%" },
      width: "13%",
      headerStyle: { width: "13%" }, */
      mySqlCol: "nb_unfilled_offers",
    },
  ];

  const options = {
    pageSize: 30,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
    debounceInterval: 1000,
    headerStyle: {
      zIndex: 0,
    },
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createEntreprise({ name, description, size, industry });
    setName("");
    setDescription("");
    setSize("");
    setIndustry("");
    tableRef.current.onQueryChange();
  };

  return (
    <div
      className={`space-y-12 md:space-y-16 ${
        !isSmallScreen ? "min-w-[900px]" : ""
      }`}
    >
      <div>
        <h1>Entreprises</h1>
        {entreprises.length > 0 && isSmallScreen && (
          <>
            <form className="mb-12 flex gap-2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nom de l'entreprise, secteur, etc.."
                value={queryStr}
                onChange={(e) => {
                  setQueryStr(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={getData}
                className="p-4 bg-rose-600 text-white rounded-xl font-semibold"
              >
                Chercher
              </button>
            </form>
            <Listings>
              {entreprises.map((entreprise) => {
                return (
                  <Listing key={entreprise.id}>
                    <EntrepriseCard entreprise={entreprise} />
                  </Listing>
                );
              })}
            </Listings>
          </>
        )}
        <div className="hidden md:block ">
          <MaterialTable
            tableRef={tableRef}
            title="Liste des entreprises"
            columns={tableColumns}
            data={
              isSmallScreen
                ? []
                : (tableState) => fetchDataFromTable(tableState, dataPath)
            }
            onRowClick={(_, rowData) => navigate(rowData.id.toString())}
            options={options}
          />
        </div>
      </div>
      <form className="hidden md:block">
        <h2>Nouvelle entreprise</h2>
        <div className="flex flex-wrap gap-8  ">
          <div className="w-full flex gap-8 items-center">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-8 items-center">
            <label htmlFor="size">Taille : </label>
            <select
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {entrepriseSizeOptions.map((sizeName) => (
                <option value={sizeName}>{sizeName}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex gap-8 items-center">
            <label htmlFor="industry">Secteur : </label>
            <select
              id="industry"
              name="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {entrepriseIndustryOptions.map((sectorName) => (
                <option value={sectorName}>{sectorName}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex gap-8 ">
            <textarea
              className="w-full h-[300px] p-2"
              id="description"
              name="description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center w-full mt-4">
            <button
              type="button"
              className="text-2xl w-1/2 font-bold  p-[20px] rounded-md text-slate-100 bg-sky-600 hover:bg-sky-800 "
              onClick={(e) => handleCreate(e)}
            >
              CREER ENTREPRISE
            </button>
          </div>
        </div>
      </form>
      <div
        className={`flex justify-center ${
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
