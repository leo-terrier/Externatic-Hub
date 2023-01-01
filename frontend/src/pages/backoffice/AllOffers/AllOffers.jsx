import OfferCard from "@components/backoffice/OfferCard/OfferCard";
import { getOffers } from "@services/APIcall";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllOffers() {
  const [offers, setOffers] = useState([]);
  const [queryStr, setQueryStr] = useState("");
  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      cellStyle: { width: "4%" },
      width: "4%",
      headerStyle: { width: "4%" },
    },
    {
      title: "Date",
      field: "date",
      type: "date",
    },
    {
      title: "Titre",
      field: "title",
    },
    {
      title: "Ville",
      field: "city",
    },
    {
      title: "Domaine",
      field: "job_field",
    },
    {
      title: "Entreprise",
      field: "entreprise_name",
    },
    {
      title: "Consultant",
      field: "consultant",
    },
    {
      title: "Statut",
      field: "status",
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
  };

  const limit = 30;
  const offset = 0;

  const fetchData = (abortController) => {
    const queryObj = queryStr ? { queryStr } : {};
    const signal = { signal: abortController.signal };
    setTimeout(() => {
      getOffers(queryObj, limit, offset, signal)
        .then(([res]) => setOffers(res))
        .catch((e) => {
          if (e.message.includes("abort")) {
            console.log(e.message);
          } else {
            throw new Error(e);
          }
        });
    }, 600);
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [queryStr]);

  return (
    <div className="prose max-w-full">
      <h1>Offres</h1>
      {offers.length > 0 && (
        <ul className="md:hidden">
          {offers.map((offer) => (
            <OfferCard offer={offer} key={offer.id} />
          ))}
        </ul>
      )}
      <div className="hidden md:block">
        <MaterialTable
          title="Liste des offres"
          columns={tableColumns}
          data={offers.length > 0 ? offers : []}
          options={options}
          onRowClick={(_, rowData) => navigate(rowData.id.toString())}
          onSearchChange={(data) => {
            setQueryStr(data);
          }}
        />
      </div>
    </div>
  );
}
