import NewPropositionEmailModal from "@components/backoffice/NewPropositionEmailModal";
import OfferCard from "@components/backoffice/OfferCard";
import Boldify from "@components/frontandback/Boldify";
import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import ResumeNotEditable from "@components/frontandback/ResumeNotEditable";
import Underline from "@components/frontandback/Underline";

import {
  fetchDataFromTable,
  getUserById,
  getUserFavorites,
  getUserPropositions,
  getUserResume,
  getUserSearchPreferences,
} from "@services/APIcall";
import MaterialTable from "material-table";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [info, setInfo] = useState({});
  const [resume, setResume] = useState({});
  const [preferences, setPreferences] = useState({});
  const [propositionsMade, setPropositionsMade] = useState([]);
  const [propositionsReceived, setPropositionsReceived] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [isPropositionEmailModalOpen, setIsPropositionEmailModalOpen] =
    useState(false);
  const offerInfoRef = useRef(null);

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
    if (!isPropositionEmailModalOpen) {
      getUserById(id).then((res) => {
        setInfo(res);
      });
      getUserResume(id).then(([res]) => {
        setResume(res);
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
    }
  }, [isPropositionEmailModalOpen]);

  // New Proposition
  const tableColumnsNewProposition = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      cellStyle: { width: "4%" },
      width: "4%",
      headerStyle: { width: "4%" },
      mySqlCol: "t1.id",
    },
    {
      title: "Date",
      field: "date",
      type: "date",
      mySqlCol: "t1.date",
    },
    {
      title: "Titre",
      field: "title",
      mySqlCol: "t1.title",
    },
    {
      title: "Ville",
      field: "city",
      mySqlCol: "t1.city",
    },
    {
      title: "Domaine",
      field: "job_field",
      mySqlCol: "t1.job_field",
    },
    {
      title: "Entreprise",
      field: "entreprise_name",
      mySqlCol: "t4.name",
    },
    {
      title: "Consultant",
      field: "consultant",
      mySqlCol: "consultant",
    },
    {
      title: "ConsultantId",
      field: "consultant_id",
      mySqlCol: "consultant",
      hidden: true,
    },
  ];

  const optionsNewProposition = {
    pageSize: 5,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 20, 30],
    debounceInterval: 1000,
    headerStyle: {
      zIndex: 0,
    },
    actionsColumnIndex: 7,
  };

  const handleNewProposition = (event, rowData) => {
    console.log(rowData);
    offerInfoRef.current = {
      id: rowData.id,
      title: rowData.title,
      entrepriseName: rowData.entreprise_name,
      city: rowData.city,
      consultantId: rowData.consultant_id,
    };
    setIsPropositionEmailModalOpen(true);
  };
  if (Object.keys(info).length) {
    return (
      <div className="space-y-8 md:space-y-12">
        <h1>
          {info.user ? (
            `${info.user} (n°${info.id})`
          ) : (
            <Underline tailwindClasses="italic">Non renseigné</Underline>
          )}
        </h1>
        <div>
          <h2>Informations candidat</h2>
          <p>
            <Boldify>Nom : </Boldify>
            {info.user || (
              <Underline tailwindClasses="italic">Non renseigné</Underline>
            )}
          </p>

          <p>
            <Boldify>Ville : </Boldify>
            {info.city || (
              <Underline tailwindClasses="italic">Non renseigné</Underline>
            )}
          </p>
          <p>
            <Boldify>Email : </Boldify>
            {info.email || (
              <Underline tailwindClasses="italic">Non renseigné</Underline>
            )}
          </p>
          <p>
            <Boldify>Tel : </Boldify>
            {info.telephone || (
              <Underline tailwindClasses="italic">Non renseigné</Underline>
            )}
          </p>
          <p>
            <Boldify>Moyen de contact préféré : </Boldify>
            {info.favcontactmethod || (
              <Underline tailwindClasses="italic">Non renseigné</Underline>
            )}
          </p>
          <p>
            <Boldify>Statut : </Boldify>
            <span
              className={`font-bold ${
                info.is_active === 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              {info.is_active === 1 ? "En recherche active" : "Inactif"}
            </span>
          </p>
        </div>
        <div>
          <h2>Préférences de recherche</h2>
          <div>
            <p>
              <Boldify>Lieu : </Boldify>
              {preferences.city || (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              )}
            </p>
            <p>
              <Boldify>Domaine : </Boldify>
              {preferences.job_fields || (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              )}
            </p>

            <p>
              <Boldify>Salaire souhaité : </Boldify>
              {preferences.compensation || (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              )}
            </p>
            <p>
              <Boldify>Taille de l'entreprise : </Boldify>
              {preferences.entreprise_sizes || (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              )}
            </p>
            <p>
              <Boldify>Secteur : </Boldify>
              {preferences.industries || (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              )}
            </p>
            <p>
              <Boldify>Nombre de jours de télétravail autorisés : </Boldify>
              {preferences.min_remote_days === (0).toString() &&
              preferences.max_remote_days === (5).toString() ? (
                <Underline tailwindClasses="italic">Non renseigné</Underline>
              ) : (
                `Entre ${preferences.min_remote_days} et ${preferences.max_remote_days} jour(s) de
              télétravail`
              )}
            </p>
          </div>
        </div>
        <section>
          <h2>CV</h2>
          {Object.keys(resume).length > 0 && (
            <ResumeNotEditable
              exp1Title={resume.exp_1_title}
              exp1Content={resume.exp_1_content}
              exp1Entreprise={resume.exp_1_entreprise}
              exp1Duration={resume.exp_1_duration}
              exp2Title={resume.exp_2_title}
              exp2Content={resume.exp_2_content}
              exp2Entreprise={resume.exp_2_entreprise}
              exp2Duration={resume.exp_2_duration}
            />
          )}
        </section>
        <section className="hidden md:block space-y-8">
          <h2>Activité</h2>
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
        <section className="hidden md:block">
          <h2>Nouvelle proposition</h2>
          <div className="hidden md:block">
            <MaterialTable
              title="Liste des offres actives"
              columns={tableColumnsNewProposition}
              data={(tableState) =>
                fetchDataFromTable(tableState, "offers", true)
              }
              options={optionsNewProposition}
              onRowClick={(_, rowData) =>
                navigate(`../offre/${rowData.id.toString()}`)
              }
              actions={[
                {
                  icon: "send",
                  tooltip: "Proposer cette offre",
                  onClick: handleNewProposition,
                },
              ]}
            />
          </div>
          <NewPropositionEmailModal
            userName={info.user}
            userId={info.id}
            offer={offerInfoRef.current}
            isPropositionEmailModalOpen={isPropositionEmailModalOpen}
            setIsPropositionEmailModalOpen={setIsPropositionEmailModalOpen}
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
