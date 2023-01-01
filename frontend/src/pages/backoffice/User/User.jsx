import {
  getUserById,
  getUserFavorites,
  getUserPropositions,
  getUserSearchPreferences,
} from "@services/APIcall";
import { Boldify } from "@services/utils";
import MaterialTable from "material-table";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [info, setInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const propositionTableColumns = [
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
      title: "Entreprise",
      field: "entreprise_name",
    },
    {
      title: "Statut",
      field: "status",
      render: (rowData) => (
        <p
          style={{
            color:
              rowData.status === "En attente"
                ? "orange"
                : rowData.status === "Rejetée"
                ? "red"
                : "green",
            fontWeight: "bold",
          }}
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
      render: (rowData) => (
        <p
          style={{
            color:
              rowData.status === "Active"
                ? "green"
                : rowData.status === "Non-pourvue"
                ? "red"
                : "purple",
            fontWeight: "bold",
          }}
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
      res.forEach((elt) => {
        elt.status =
          elt.status === "pending"
            ? "En attente"
            : elt.status === "accepted"
            ? "Acceptée"
            : "Rejetée";
      });
      setPropositionsMade(
        res.filter((elt) => elt.proposition_initiative === "user")
      );
      setPropositionsReceived(
        res.filter((elt) => elt.proposition_initiative === "entreprise")
      );
    });
    getUserFavorites(id).then((res) => {
      res.forEach((elt) => {
        elt.status =
          elt.status === "active"
            ? "Active"
            : elt.status === "filled"
            ? "Pourvue"
            : "Non-pourvue";
      });
      setFavorites(res);
    });
  }, []);

  const infoPropertyArr = Object.keys(info);
  if (infoPropertyArr.length > 0) {
    return (
      <div className="space-y-12">
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
        <div className="flex gap-10">
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
        </div>
        <MaterialTable
          title="Offres favorites"
          columns={favoriteTableColumns}
          data={favorites}
          options={options}
          onRowClick={(_, rowData) =>
            navigate(`../offre/${rowData.id.toString()}`)
          }
        />
      </div>
    );
  }
}
