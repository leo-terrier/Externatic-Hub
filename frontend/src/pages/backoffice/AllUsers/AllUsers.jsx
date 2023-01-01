import UserCard from "@components/backoffice/UserCard/UserCard";
import { getUsers } from "@services/APIcall";
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
    {
      title: "Statut",
      field: "status",
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
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) =>
      setUsers(
        res.map((elt) => {
          const obj = {
            ...elt,
            status: elt.is_active ? "Actif" : "Inactif",
          };
          delete obj.is_active;
          return obj;
        })
      )
    );
  }, []);

  return (
    <div className="prose max-w-full">
      <h1>Candidats</h1>
      {users.length > 0 && (
        <ul className="md:hidden">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
      {users.length > 0 && (
        <div className="hidden md:block">
          <MaterialTable
            title="Liste des candidats"
            columns={tableColumns}
            data={users}
            options={options}
            onRowClick={(_, rowData) => navigate(rowData.id.toString())}
          />
        </div>
      )}
    </div>
  );
}
