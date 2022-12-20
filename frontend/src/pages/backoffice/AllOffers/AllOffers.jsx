import OfferCard from "@components/OfferCard/OfferCard";
import { getOffers } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllOffers() {
  const navigate = useNavigate();

  // concat city + zipcode

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
      title: "Entreprise",
      field: "entreprise_name",
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
      onClick: (event, rowData) => {
        navigate(rowData.id.toString());
      },
    },
  ];

  const options = {
    actionsColumnIndex: -1,
  };

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers().then((res) =>
      setOffers(
        res.map((elt) => {
          return {
            id: elt.id,
            title: elt.title,
            city: elt.city,
            job_field: elt.job_field,
            entreprise_name: elt.entreprise_name,
            industry: elt.entreprise_industry,
            status: elt.status,
          };
        })
      )
    );
  }, []);

  return (
    <>
      <h1>Offres</h1>
      {offers.length > 0 &&
        offers.map((offer) => {
          return (
            <ul>
              <OfferCard offer={offer} key={offer.id} />
            </ul>
          );
        })}
      {offers.length > 0 && (
        <MaterialTable
          title="Liste des offres"
          columns={tableColumns}
          data={offers}
          actions={actions}
          options={options}
        />
      )}
    </>
  );
}
