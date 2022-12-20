import UserCard from "@components/UserCard/UserCard";
import { getUsers } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
    },
    {
      title: "Prénom",
      field: "firstname",
    },
    {
      title: "Nom",
      field: "lastname",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Tel",
      field: "telephone",
    },
    {
      title: "Ville",
      field: "city",
    },
    {
      title: "Statut",
      field: "status",
    },
    {
      title: "Propositions",
      field: "nb_received_propositions",
    },
    {
      title: "Candidatures",
      field: "nb_sent_propositions",
    },
    {
      title: "Offres pourvues",
      field: "filled_offers",
    },
  ];

  const actions = [
    {
      icon: "visibility",
      tooltip: "Accéder",
      onClick: (event, rowData) => {
        console.log(rowData);
        navigate(rowData.id);
      },
    },
  ];

  const options = {
    actionsColumnIndex: -1,
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) =>
      setUsers(
        res.map((elt) => {
          const obj = {
            ...elt,
            status: elt.is_active ? "actif" : "inactif",
          };
          delete obj.is_active;
          return obj;
        })
      )
    );
  }, []);

  return (
    <>
      <div>Candidats</div>
      {users.length > 0 &&
        users.map((user) => {
          return (
            <ul>
              <UserCard key={user.id} user={user} />
            </ul>
          );
        })}
      {users.length > 0 && (
        <MaterialTable
          title="Liste des candidats"
          columns={tableColumns}
          data={users}
          actions={actions}
          options={options}
        />
      )}
    </>
  );
}
