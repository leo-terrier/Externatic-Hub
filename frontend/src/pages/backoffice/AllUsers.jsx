import UserCard from "@components/backoffice/UserCard";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import { Pagination } from "@mui/material";
import { fetchAPIData, fetchDataFromTable } from "@services/APIcall";
import useWindowDimensions from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import resolveConfig from "tailwindcss/resolveConfig";

const config = "../../../tailwind.config";

export default function AllUsers() {
  const navigate = useNavigate();
  const [totalUserCount, setTotalUserCount] = useState(null);
  const dataPath = "users";

  // For viewport change
  const tableRef = useRef();
  const { width } = useWindowDimensions();
  const fullConfig = resolveConfig(config);
  const mdBreakPoint = parseInt(
    fullConfig.theme.screens.md.replace("px", ""),
    10
  );
  const isSmallScreen = width < mdBreakPoint;

  // For small screens
  const [queryStr, setQueryStr] = useState("");
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const offset = (pageNumber - 1) * 10;

  const getData = () => {
    const limit = 10;
    const queryObj = {};
    if (queryStr) queryObj.queryStr = queryStr;

    fetchAPIData(queryObj, limit, offset, dataPath).then(
      ([res, entrepriseCount]) => {
        setUsers(res);
        setTotalUserCount(entrepriseCount[0].totalCount);
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

  // For large screens (table with table-fetching)
  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      mySqlCol: "t1.id",
    },
    {
      title: "Nom",
      field: "user_name",
      mySqlCol: "user_name",
    },
    {
      title: "Email",
      field: "email",
      mySqlCol: "t1.email",
    },
    {
      title: "Tel",
      field: "telephone",
      mySqlCol: "t1.telephone",
    },
    {
      title: "Ville",
      field: "city",
      mySqlCol: "t1.city",
    },
    {
      title: "Candidatures",
      field: "nb_sent_propositions",
      mySqlCol: "nb_sent_propositions",
    },
    {
      title: "Propositions",
      field: "nb_received_propositions",
      mySqlCol: "nb_received_propositions",
    },
    {
      title: "Offres pourvues",
      field: "nb_filled_offers",
      mySqlCol: "nb_filled_offers",
    },
    {
      title: "Statut",
      field: "status",
      mySqlCol: "status",
      render: (rowData) => (
        <p
          className={`font-bold text-${
            rowData.status === "Actif" ? "green" : "red"
          }-500`}
        >
          {rowData.status}
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
        <h1>Candidats</h1>
        {users.length > 0 && isSmallScreen && (
          <>
            <form className="mb-12 flex gap-2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nom, id, telephone, etc.."
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
              {users.map((user) => {
                return (
                  <Listing key={user.id}>
                    <UserCard user={user} />
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
          title="Liste des candidats"
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
        className={`flex justify-center ${totalUserCount < 10 ? "hidden" : ""}`}
      >
        <Pagination
          count={Math.ceil(totalUserCount / 10)}
          onChange={(_, value) => {
            setPageNumber(value);
          }}
        />
      </div>
    </div>
  );
}
