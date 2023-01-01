import CreateOfferForm from "@components/backoffice/CreateOfferForm/CreateOfferForm";
import { getEntrepriseById, getEntrepriseOffers } from "@services/APIcall";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Entreprise() {
  // Fetched data
  const [info, setInfo] = useState({});
  const [activeOffers, setActiveOffers] = useState([]);
  const [inactiveOffers, setInactiveOffers] = useState([]);

  const { id: entrepriseId } = useParams();

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
          {rowData.status}
        </p>
      ),
    },
  ];

  const options = {
    pageSize: 10,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
  };

  const loadOffers = () => {
    getEntrepriseById(entrepriseId).then((res) => {
      setInfo(res);
    });
    getEntrepriseOffers(entrepriseId).then((res) => {
      res.forEach((elt) => {
        elt.status =
          elt.status === "active"
            ? "Active"
            : elt.status === "filled"
            ? "Pourvue"
            : "Non-pourvue";
      });
      setActiveOffers(res.filter((elt) => elt.status === "Active"));
      setInactiveOffers(res.filter((elt) => elt.status !== "Active"));
    });
  };

  useEffect(loadOffers, []);

  if (Object.keys(info).length > 0) {
    return (
      <div className="flex flex-col gap-16 ">
        <div>
          <h1>{`${info.name} (n° ${info.id})`}</h1>
          <p className="font-bold">Taille : {info.size}</p>
          <p className="font-bold">Secteur : {info.industry}</p>
          <p className="whitespace-pre-line">{info.description}</p>
        </div>
        <MaterialTable
          title="Liste des offres actives"
          columns={tableColumns}
          data={activeOffers}
          options={options}
          onRowClick={(_, rowData) =>
            navigate(`../offre/${rowData.id.toString()}`)
          }
        />
        <MaterialTable
          title="Liste des offres inactives"
          columns={tableColumns}
          data={inactiveOffers}
          options={options}
          onRowClick={(_, rowData) =>
            navigate(`../offre/${rowData.id.toString()}`)
          }
        />
        <CreateOfferForm entrepriseId={entrepriseId} loadOffers={loadOffers} />
      </div>
    );
  }
}
