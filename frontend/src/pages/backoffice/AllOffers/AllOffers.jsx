/* import OfferCard from "@components/backoffice/OfferCard/OfferCard";
 */ import { fetchDataFromTable } from "@services/APIcall";

import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";

export default function AllOffers() {
  // const [offers, setOffers] = useState([]);
  // const [queryStr, setQueryStr] = useState("");
  const navigate = useNavigate();

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
      mySqlCol: "CONCAT(t3.firstname, ' ', UPPER(t3.lastname))",
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
  };

  /* const fetchData = async (tableState, brigite) => {
    const { search, pageSize, page, orderBy, orderDirection } = tableState;
    const queryObj = {};
    console.log(tableState);
    if (tableState.search) queryObj.queryStr = search;
    if (tableState.orderBy) {
      queryObj.orderDirection = orderDirection;
    }
    const offset = pageSize * page;
    const [offers, [{ offercount }]] = await getOffers(
      queryObj,
      pageSize,
      offset
    );

    return {
      data: offers,
      page,
      totalCount: offercount,
    };
  }; */

  const dataPath = "offers";
  return (
    <div className="prose max-w-full">
      <h1>Offres</h1>
      {/*  {offers.length > 0 && (
        <ul className="md:hidden">
          {offers.map((offer) => (
            <OfferCard offer={offer} key={offer.id} />
          ))}
        </ul>
      )} */}
      <div className="hidden md:block">
        <MaterialTable
          title="Liste des offres"
          columns={tableColumns}
          data={(tableState) => fetchDataFromTable(tableState, dataPath)}
          options={options}
          onRowClick={(_, rowData) => navigate(rowData.id.toString())}
        />
      </div>
    </div>
  );
}
