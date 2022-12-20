import EntrepriseCard from "@components/EntrepriseCard/EntrepriseCard";
import { getEntreprises } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllEntreprises() {
  const [entreprises, setEntreprises] = useState([]);

  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
    },
    {
      title: "Nom",
      field: "name",
    },
    {
      title: "Taille",
      field: "size",
    },
    {
      title: "Secteur",
      field: "industry",
    },
    {
      title: "Offres actives",
      field: "nb_active_offers",
    },
    {
      title: "Offres pourvues",
      field: "nb_filled_offers",
    },
    {
      title: "Offres non-pourvues",
      field: "nb_unfilled_offers",
    },
  ];

  const actions = [
    {
      icon: "visibility",
      tooltip: "Accéder",
      onClick: (event, rowData) => {
        console.log(rowData);
        navigate(rowData.id.toString());
      },
    },
  ];

  const options = {
    actionsColumnIndex: -1,
  };

  useEffect(() => {
    getEntreprises().then((res) => {
      setEntreprises(() => {
        return res.map((elt) => {
          return {
            id: elt.id,
            name: elt.name,
            size: elt.size,
            industry: elt.industry,
            nb_active_offers: elt.nb_active_offers,
            nb_filled_offers: elt.nb_filled_offers,
            nb_unfilled_offers: elt.nb_unfilled_offers,
          };
        });
      });
    });
  }, []);

  return (
    <>
      <h1>Entreprise</h1>
      <ul>
        {entreprises.length > 0 &&
          entreprises.map((entreprise) => {
            return (
              <EntrepriseCard key={entreprise.id} entreprise={entreprise} />
            );
          })}
      </ul>
      {entreprises.length > 0 && (
        <MaterialTable
          title="Liste des entreprises"
          columns={tableColumns}
          data={entreprises}
          actions={actions}
          options={options}
        />
      )}
    </>
  );
}
