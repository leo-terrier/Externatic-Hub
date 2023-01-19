import { useEffect, useRef, useState } from "react";
import { Pagination } from "@mui/material";
import useWindowDimensions from "@services/utils";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";
import OfferCard from "@components/backoffice/OfferCard";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import { fetchAPIData, fetchDataFromTable } from "@services/APIcall";

const config = "../../../tailwind.config";

export default function AllOffers() {
  const navigate = useNavigate();
  const [totalOfferCount, setTotalOfferCount] = useState(null);
  const dataPath = "offers";

  // For viewport change
  const tableRef = useRef();
  const { width } = useWindowDimensions();
  const fullConfig = resolveConfig(config);
  const mdBreakPoint = parseInt(
    fullConfig.theme.screens.md.replace("px", ""),
    10
  );
  const isSmallScreen = width < mdBreakPoint;

  // For small screens (Cards)
  const [offers, setOffers] = useState([]);
  const [queryStr, setQueryStr] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * 10;

  const getData = () => {
    const limit = 10;
    const queryObj = {};
    if (queryStr) queryObj.queryStr = queryStr;

    fetchAPIData(queryObj, limit, offset, dataPath).then(
      ([res, offerCount]) => {
        setOffers(res);
        setTotalOfferCount(offerCount[0].totalCount);
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

  // For large screens (table with fetching from table)
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
      title: "Date",
      field: "date",
      type: "date",
      mySqlCol: "t1.date",
    },
    {
      title: "Titre",
      field: "title",
      mySqlCol: "t1.title",
    },
    {
      title: "Ville",
      field: "city",
      mySqlCol: "t1.city",
    },
    {
      title: "Domaine",
      field: "job_field",
      mySqlCol: "t1.job_field",
    },
    {
      title: "Entreprise",
      field: "entreprise_name",
      mySqlCol: "t4.name",
    },
    {
      title: "Consultant",
      field: "consultant",
      mySqlCol: "consultant",
    },
    {
      title: "Statut",
      field: "status",
      mySqlCol: "status",
      render: (rowData) => (
        <p
          className={`font-bold text-${
            rowData.status === "Active"
              ? "green"
              : rowData.status === "Non-pourvue"
              ? "red"
              : "purple"
          }-500`}
        >
          {rowData.status[0].toUpperCase() + rowData.status.slice(1)}
        </p>
      ),
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

  return (
    <div
      className={`space-y-12 md:space-y-16 ${
        !isSmallScreen ? "min-w-[900px]" : ""
      }`}
    >
      <div>
        <h1>Offres</h1>
        {offers.length > 0 && isSmallScreen && (
          <>
            <form className="mb-12 flex gap-2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Poste, entreprise, secteur, etc.."
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
              {offers.map((offer) => {
                return (
                  <Listing key={offer.id}>
                    <OfferCard offer={offer} />
                  </Listing>
                );
              })}
            </Listings>
          </>
        )}
      </div>
      <div className="hidden md:block">
        <MaterialTable
          tableRef={tableRef}
          title="Liste des offres"
          columns={tableColumns}
          data={
            isSmallScreen
              ? []
              : (tableState) => fetchDataFromTable(tableState, dataPath)
          }
          options={options}
          onRowClick={(_, rowData) => navigate(rowData.id.toString())}
        />
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
