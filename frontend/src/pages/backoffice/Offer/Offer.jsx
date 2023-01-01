import { getOfferById, getOfferPropositions } from "@services/APIcall";
import { Boldify, Underline } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Offer() {
  const [info, setInfo] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const tableColumns = [
    {
      title: "Date",
      field: "date",
      type: "date",
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
      title: "Statut",
      field: "status",
      render: (rowData) => (
        <p
          style={{
            fontWeight: "bold",
            color:
              rowData.status === "Rejetée"
                ? "red"
                : rowData.status === "Acceptée"
                ? "green"
                : "orange",
          }}
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

  const loadingOfferAndPropositions = () => {
    getOfferById(id).then((res) => {
      // Handling of status translation
      res.status =
        res.status === "active"
          ? "Active"
          : res.status === "unfilled"
          ? "Non-pourvue"
          : "Pourvue";
      // Handling of null|undefined INT
      res.max_compensation = res.max_compensation || "N/A";
      res.min_compensation = res.min_compensation || "N/A";
      res.remote_days = res.remote_days || "N/A";
      res.content = res.content || "N/A";
      res.stack = res.stack || "N/A";

      setInfo(res);
    });
    getOfferPropositions(id).then((res) => {
      res.forEach((elt) => {
        // Handling of status translation
        elt.status =
          elt.status === "pending"
            ? "En attente"
            : elt.status === "accepted"
            ? "Acceptée"
            : "Rejetée";
      });
      setPropositionsMade(
        res.filter((elt) => elt.proposition_initiative === "entreprise")
      );
      setPropositionsReceived(
        res.filter((elt) => elt.proposition_initiative === "user")
      );
    });
  };

  useEffect(loadingOfferAndPropositions, []);

  if (Object.keys(info).length > 0) {
    return (
      <div className="flex flex-col gap-12 relative">
        <section className="italic">
          <h1 className="mb-2 not-italic">
            {info.title} (n°{info.id})
          </h1>
          <p className="text-slate-600 underline text-xl">
            <Link to={`../entreprise/${info.entreprise_id.toString()}`}>
              {info.entreprise_name}
            </Link>
          </p>
          <p>{new Date(info.date).toLocaleString().split(" ")[0]}</p>
        </section>
        <div className="border-dashed border-black	bg-gray-200 border-2 p-4 absolute right-0 rounded-sm">
          <p>
            <Boldify>Consultant : </Boldify>
            {info.consultant}
          </p>
          <p
            className={`font-bold ${
              info.status === "Active"
                ? "text-green-500"
                : info.status === "Pourvue"
                ? "text-purple-500"
                : "text-red-500"
            }`}
          >
            <Boldify>Statut : </Boldify>
            {info.status}
          </p>
          <p>
            <Underline>Secteur d'activité</Underline> :{" "}
            {info.entreprise_industry}
          </p>
          <p>
            <Underline>Taille de l'entreprise</Underline> :{" "}
            {info.entreprise_size}
          </p>
        </div>
        <section className="flex flex-col gap-4">
          <div>
            <h2>Informations offre</h2>
            <p>
              <Boldify>Ville : </Boldify>
              {info.city}
            </p>
            <p>
              <Boldify>Domaine : </Boldify>
              {info.job_field}
            </p>
            <p>
              <Boldify>Technos :</Boldify> {info.stack}
            </p>
            <p>
              <Boldify>Salaire min : </Boldify>
              {info.min_compensation}
            </p>
            <p>
              <Boldify>Salaire max : </Boldify>
              {info.max_compensation}
            </p>
            <p>
              <Boldify>Jours de télétravail autorisés : </Boldify>
              {info.remote_days}
            </p>
          </div>
          <div>
            <h3>Description</h3>
            <p className="whitespace-pre-line	">{info.content}</p>
          </div>
          <div>
            <h3>Contact de l'entreprise</h3>
            <p>
              {info.entreprise_contact} ({info.entreprise_contact_job_title})
            </p>
            <p>{info.entreprise_contact_email}</p>
            <p>{info.entreprise_contact_telephone}</p>
          </div>
        </section>
        <section>
          <MaterialTable
            title="Propositions faite aux candidats"
            columns={tableColumns}
            data={propositionsMade}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../proposition/${rowData.id.toString()}`)
            }
            style={{ width: "100%" }}
          />
        </section>
        <section>
          <MaterialTable
            title="Candidatures reçues"
            columns={tableColumns}
            data={propositionsReceived}
            options={options}
            onRowClick={(_, rowData) =>
              navigate(`../proposition/${rowData.id.toString()}`)
            }
            style={{ width: "100%" }}
          />
        </section>
      </div>
    );
  }
}
