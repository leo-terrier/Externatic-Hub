import { getOfferById, getOfferPropositions } from "@services/utils";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { /* useNavigate , */ useParams } from "react-router-dom";

export default function Offer() {
  const [info, setInfo] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);
  const { id } = useParams();
  // const navigate = useNavigate();

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
      title: "Statut",
      field: "status",
    },
  ];

  const actions = [
    {
      icon: "visibility",
      tooltip: "Accéder",
      onClick: (_, rowData) => {
        console.log(rowData);
      },
    },
  ];

  const options = {
    actionsColumnIndex: -1,
  };

  useEffect(() => {
    getOfferById(id).then((res) => {
      setInfo(res);
    });
    getOfferPropositions(id).then((res) => {
      res.forEach((elt) => {
        elt.status =
          elt.status === "pending"
            ? "En attente"
            : elt.status === "accepted"
            ? "Accepté"
            : "Rejeté";
      });
      setPropositionsMade(
        res.filter((elt) => elt.proposition_initiative === "entreprise")
      );
      setPropositionsReceived(
        res.filter((elt) => elt.proposition_initiative === "user")
      );
    });
  }, []);

  if (Object.keys(info).length > 0) {
    return (
      <>
        <div>
          <h1>
            {info.title} ({info.status})
          </h1>
          <p>{info.job_field}</p>
          <p>{info.entreprise_name}</p>
          <p>{info.entreprise_industry}</p>
          <p>{info.entreprise_size}</p>
          <p>{info.city}</p>
        </div>
        <div>
          <p>{info.content}</p>
          <p>{info.stack}</p>
          <p>{info.min_compensation}</p>
          <p>{info.max_compensation}</p>
          <p>{info.remote_days}</p>
        </div>
        <div>
          <p>contact : {info.contact_email}</p>
          <p>
            <strong>
              consultant :{" "}
              {`${info.consultant_firstname} ${info.consultant_lastname}`}
            </strong>
          </p>
          <p>{info.min_compensation}</p>
          <p>{info.max_compensation}</p>
          <p>{info.remote_days}</p>
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            margin: "0 auto",
            justifyContent: "space-evenly",
          }}
        >
          <MaterialTable
            title="Propositions faite aux candidats"
            columns={tableColumns}
            data={propositionsMade}
            actions={actions}
            options={options}
          />
          <MaterialTable
            title="Candidatures reçues"
            columns={tableColumns}
            data={propositionsReceived}
            actions={actions}
            options={options}
          />
        </div>
      </>
    );
  }
}
