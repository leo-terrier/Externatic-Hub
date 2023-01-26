import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OfferCard from "@components/backoffice/OfferCard";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import {
  getUserById,
  getUserFavorites,
  getUserPropositions,
  getUserSearchPreferences,
} from "@services/APIcall";
import { Boldify } from "@services/utils";

export default function User() {
  const [info, setInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  // For large screens (tables)
  const propositionTableColumns = [
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
      title: "Entreprise",
      field: "entreprise_name",
    },
    {
      title: "Domaine",
      field: "job_field",
    },
    {
      title: "Ville",
      field: "city",
    },
    {
      title: "Statut",
      field: "status",
      render: (rowData) => (
        <p
          className={`font-bold text-${
            rowData.status === "En attente"
              ? "orange"
              : rowData.status === "Rejetée"
              ? "red"
              : "green"
          }-500`}
        >
          {rowData.status}
        </p>
      ),
    },
  ];

  const favoriteTableColumns = [
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
      title: "Entreprise",
      field: "name",
    },
    {
      title: "Domaine",
      field: "job_field",
    },
    {
      title: "Ville",
      field: "city",
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
    pageSize: 10,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
  };

  useEffect(() => {
    getUserById(id).then((res) => {
      setInfo(res);
    });
    getUserSearchPreferences(id).then((res) => {
      setPreferences(res);
    });
    getUserPropositions(id).then((res) => {
      setPropositionsMade(
        res.filter((elt) => elt.proposition_initiative === "user")
      );
      setPropositionsReceived(
        res.filter((elt) => elt.proposition_initiative === "entreprise")
      );
    });
    getUserFavorites(id).then((res) => setFavorites(res));
  }, []);

  if (Object.keys(info).length) {
    return (
      <div className="space-y-8 md:space-y-12">
        <h1>{`${info.firstname} ${info.lastname} (n°${info.id})`}</h1>
        <div>
          <h2>Informations candidat</h2>
          <p>
            <Boldify>Prénom : </Boldify>
            {info.firstname}
          </p>
          <p>
            <Boldify>Nom : </Boldify>
            {info.lastname}
          </p>
          <p>
            <Boldify>Ville : </Boldify>
            {info.city}
          </p>
          <p>
            <Boldify>Code postal :</Boldify> {info.zipcode}
          </p>
          <p>
            <Boldify>Email : </Boldify>
            {info.email}
          </p>
          <p>
            <Boldify>Tel : </Boldify>
            {info.telephone}
          </p>
          <p>
            <Boldify>Moyen de contact préféré : </Boldify>
            {info.favcontactmethod}
          </p>
          <p>
            <Boldify>CV : </Boldify>
            {info.cv || "N/A"}
          </p>
          <p
            className={
              info.status === "active"
                ? "text-green-500"
                : "text-red-500 font-bold"
            }
          >
            <Boldify>Statut : </Boldify>
            {info.status === "active" ? "Actif" : "Inactif"}
          </p>
        </div>
        <div>
          <h2>Préférences de recherche</h2>
          <div>
            <p>
              <Boldify>Lieu : </Boldify>
              {`${preferences.city} ${preferences.zipcode}`}
            </p>
            <p>
              <Boldify>Domaine : </Boldify>
              {preferences.job_field}
            </p>
            <p>
              <Boldify>Technos : </Boldify>
              {preferences.stack}
            </p>
            <p>
              <Boldify>Salaire souhaité : </Boldify>
              {preferences.compensation || "N/A"}
            </p>
            <p>
              <Boldify>Taille de l'entreprise : </Boldify>
              {preferences.entreprise_size}
            </p>
            <p>
              <Boldify>Secteur : </Boldify>
              {preferences.industry}
            </p>
            <p>
              <Boldify>Nombre de jours de télétravail autorisés : </Boldify>
              {preferences.remote_days || "N/A"}
            </p>
            <p>
              <Boldify>Diplôme requis : </Boldify>
              {preferences.education}
            </p>
          </div>
        </div>
        <section className="hidden md:block">
          <MaterialTable
            title="Propositions reçues"
            columns={propositionTableColumns}
            data={propositionsReceived}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../proposition/${rowData.id.toString()}`)
            }
            style={{ width: "100%" }}
          />
        </section>
        <section className="hidden md:block">
          <MaterialTable
            title="Candidatures réalisées"
            columns={propositionTableColumns}
            data={propositionsMade}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../proposition/${rowData.id.toString()}`)
            }
            style={{ width: "100%" }}
          />
        </section>
        <section className="hidden md:block">
          <MaterialTable
            title="Offres favorites"
            columns={favoriteTableColumns}
            data={favorites}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../offre/${rowData.id.toString()}`)
            }
          />
        </section>
        <section className="md:hidden">
          <h2>Candidature effectuées</h2>
          <ul className="space-y-2">
            {propositionsMade.length > 0 ? (
              propositionsMade.map((proposition) => {
                return (
                  <li className="bg-white border-b-2 p-2">
                    <Link to={`../proposition/${proposition.id.toString()}`}>
                      <p className="text-lg font-bold">{proposition.title}</p>
                      <p className="font-bold text-rose-600">
                        {proposition.entreprise_name}
                      </p>
                      <div className="flex justify-between">
                        <p>
                          le{" "}
                          {
                            new Date(proposition.date)
                              .toLocaleString()
                              .split(" ")[0]
                          }
                        </p>
                        <p
                          className={`text-${
                            proposition.status === "Rejetée"
                              ? "red"
                              : proposition.status === "Acceptée"
                              ? "green"
                              : "orange"
                          }-500 text-right`}
                        >
                          {proposition.status}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>Vide</li>
            )}
          </ul>
        </section>
        <section className="md:hidden">
          <h2>Propositions reçues</h2>
          <ul className="space-y-2">
            {propositionsReceived.length > 0 ? (
              propositionsReceived.map((proposition) => {
                return (
                  <li className="bg-white border-b-2 p-2">
                    <Link to={`../proposition/${proposition.id.toString()}`}>
                      <p className="text-lg font-bold">{proposition.title}</p>
                      <p className="font-bold text-rose-600">
                        {proposition.entreprise_name}
                      </p>
                      <div className="flex justify-between">
                        <p>
                          le{" "}
                          {
                            new Date(proposition.date)
                              .toLocaleString()
                              .split(" ")[0]
                          }
                        </p>
                        <p
                          className={`text-${
                            proposition.status === "Rejetée"
                              ? "red"
                              : proposition.status === "Acceptée"
                              ? "green"
                              : "orange"
                          }-500 text-right`}
                        >
                          {proposition.status}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>Vide</li>
            )}
          </ul>
        </section>
        <section className=" md:hidden">
          <h2>Offres favorites</h2>
          <Listings>
            {favorites.length ? (
              favorites.map((offer) => {
                return (
                  <Listing key={offer.id}>
                    <OfferCard offer={offer} />
                  </Listing>
                );
              })
            ) : (
              <li>Vide</li>
            )}
          </Listings>
        </section>
      </div>
    );
  }
}
