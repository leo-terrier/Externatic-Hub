import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOfferById, getOfferPropositions } from "@services/APIcall";
import { Boldify, Underline } from "@services/utils";

export default function Offer() {
  const [info, setInfo] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  // For large screens (table)
  const tableColumns = [
    {
      title: "Date",
      field: "date",
      type: "date",
    },
    {
      title: "Candidat",
      field: "user_name",
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
      title: "Statut",
      field: "status",
      render: (rowData) => (
        <p
          className={`font-bold text-${
            rowData.status === "Rejetée"
              ? "red"
              : rowData.status === "Acceptée"
              ? "green"
              : "orange"
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

  const loadingOfferAndPropositions = () => {
    getOfferById(id).then((res) => {
      setInfo(res);
    });
    getOfferPropositions(id).then((res) => {
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
      <div className="space-y-8 md:space-y-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row ">
          <header className="italic">
            <h1 className="mb-2 not-italic">
              {info.title} (n°{info.id})
            </h1>
            <p className="text-slate-600 underline text-xl">
              <Link to={`../entreprise/${info.entreprise_id.toString()}`}>
                {info.entreprise_name}
              </Link>
            </p>
            <p>{new Date(info.date).toLocaleString().split(" ")[0]}</p>
          </header>
          <div className="mt-0 border-dashed border-black	bg-white md:bg-gray-200 border-2 p-4 rounded-sm">
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
        </div>
        <section>
          <h2>Informations</h2>
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
            {info.min_compensation.toLocaleString()} €
          </p>
          <p>
            <Boldify>Salaire max : </Boldify>
            {info.max_compensation.toLocaleString()} €
          </p>
          <p>
            <Boldify>Télétravail autorisé : </Boldify>
            {info.remote_days} {/\d/.test(info.remote_days) && "jour(s)"}
          </p>
        </section>
        <section>
          <h2>Descriptif</h2>
          <div className="p-4 border-l-4  bg-white md:border-0 md:p-0">
            <p className="whitespace-pre-line	">{info.content}</p>
          </div>
        </section>
        <section>
          <h2>Contact de l'entreprise</h2>
          <p>
            {info.entreprise_contact} ({info.entreprise_contact_job_title})
          </p>
          <p>{info.entreprise_contact_email}</p>
          <p>{info.entreprise_contact_telephone}</p>
        </section>
        <section className="hidden md:block">
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
        <section className="hidden md:block">
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
        {Object.keys(info).length > 0 && (
          <section className="md:hidden space-y-6">
            <h2>Candidatures reçues</h2>
            <ul className="space-y-2">
              {propositionsMade.length > 0 ? (
                propositionsMade.map((proposition) => (
                  <li className="bg-white border-b-2 p-2">
                    <Link to={`../proposition/${proposition.id.toString()}`}>
                      <div className="flex justify-between gap-2">
                        <p className="font-bold">{proposition.user_name}</p>
                        <p>
                          le{" "}
                          {
                            new Date(proposition.date)
                              .toLocaleString()
                              .split(" ")[0]
                          }
                        </p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p>{proposition.email}</p>
                        <p> {proposition.telephone}</p>
                      </div>
                      <div>
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
                ))
              ) : (
                <li>Vide</li>
              )}
            </ul>
          </section>
        )}
        {Object.keys(info).length > 0 && (
          <section className="md:hidden space-y-6">
            <h2>Propositions faites aux candidats</h2>
            <ul className="space-y-2">
              {propositionsReceived.length > 0 ? (
                propositionsReceived.map((proposition) => (
                  <li className="bg-white border-b-2 p-2">
                    <Link to={`../proposition/${proposition.id.toString()}`}>
                      <div className="flex justify-between gap-2">
                        <p className="font-bold">{proposition.user_name}</p>
                        <p>
                          le{" "}
                          {
                            new Date(proposition.date)
                              .toLocaleString()
                              .split(" ")[0]
                          }
                        </p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p>{proposition.email}</p>
                        <p> {proposition.telephone}</p>
                      </div>
                      <div>
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
                ))
              ) : (
                <li>Vide</li>
              )}
            </ul>
          </section>
        )}
      </div>
    );
  }
}
