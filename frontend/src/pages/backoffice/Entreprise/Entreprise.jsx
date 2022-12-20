import { getEntrepriseById, getEntrepriseOffers } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Entreprise() {
  const [info, setInfo] = useState({});
  const [activeOffers, setActiveOffers] = useState([]);
  const [inactiveOffers, setInactiveOffers] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
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
      title: "Secteur",
      field: "industry",
    },
    {
      title: "Statut",
      field: "status",
    },
  ];

  const actions = [
    {
      icon: "visibility",
      tooltip: "Accéder",
      onClick: (_, rowData) => {
        navigate(`../offre/:${rowData.id.toString()}`);
      },
    },
  ];

  const options = {
    actionsColumnIndex: -1,
  };

  useEffect(() => {
    getEntrepriseById(id).then((res) => {
      setInfo(res);
    });
    getEntrepriseOffers(id).then((res) => {
      setActiveOffers(res.filter((elt) => elt.status === "active"));
      setInactiveOffers(res.filter((elt) => elt.is_active === "inactive"));
    });
  }, []);

  if (Object.keys(info).length > 0) {
    return (
      <>
        <div>
          <h1>{`${info.name} (${info.id})`}</h1>
          <p>{info.description}</p>
          <p>Taille : {info.size}</p>
          <p>Secteur : {info.industry}</p>
        </div>
        <MaterialTable
          title="Liste des offres actives"
          columns={tableColumns}
          data={activeOffers}
          actions={actions}
          options={options}
        />
        <MaterialTable
          title="Liste des offres inactives"
          columns={tableColumns}
          data={inactiveOffers}
          actions={actions}
          options={options}
        />
      </>
    );
  }
}
