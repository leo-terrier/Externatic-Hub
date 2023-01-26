import {
  getPropositionById,
  getPropositionInterviews,
  getPropositionMessages,
} from "@services/APIcall";
import { Boldify, Underline } from "@services/utils";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Proposition() {
  const [info, setInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const { id } = useParams();

  const loadPropositionDetailsAndSteps = () => {
    getPropositionById(id).then((res) => setInfo(res));
    getPropositionInterviews(id).then((res) => setInterviews(res));
    getPropositionMessages(id).then((res) => setMessages(res));
  };

  useEffect(loadPropositionDetailsAndSteps, []);

  const infoArr = Object.keys(info);
  if (infoArr.length > 0)
    return (
      <div className="space-y-12">
        <header>
          <h1 className="mb-2">
            {info.proposition_initiative === "user"
              ? "CANDIDATURE : "
              : "PROPOSITION : "}
            {info.offer_title}
          </h1>
          <p className="italic">
            {info.proposition_initiative === "user"
              ? "Candidature faite par le candidat"
              : "Proposition faite au candidat"}{" "}
            le {new Date(info.proposition_date).toLocaleString().split(" ")[0]}
          </p>
          <p>
            <Boldify>Consultant : </Boldify> {info.consultant}
          </p>
          <p
            className={`font-bold ${
              info.proposition_status === "En attente"
                ? "text-orange-500"
                : info.proposition_status === "Rejetée"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            <Boldify>Statut : </Boldify>
            {info.proposition_status}
          </p>
        </header>
        <section>
          <h2>Informations sur l'offre</h2>
          <div className="grid grid-cols-1 gap-8  bg-white border-l-2 px-4 py-2 md:p-0 md:border-0 md:grid-cols-3 md:gap-20 ">
            <div>
              <h3>Detail de l'offre</h3>
              <p>
                <Boldify>Offre : </Boldify>
                <Link to={`../offre/${info.offer_id}`}>
                  <Underline>{info.offer_title}</Underline>
                </Link>
              </p>
              <p>
                <Boldify>
                  Statut :{" "}
                  <span
                    className={` ${
                      info.offer_status === "Active"
                        ? "text-green-500"
                        : "Non-pourvue"
                        ? "text-red-500"
                        : "text-purple-500"
                    }`}
                  >
                    {info.offer_status}
                  </span>
                </Boldify>{" "}
              </p>
              <p>
                <Boldify>Ville : </Boldify>
                {info.offer_city}
              </p>
              <p>
                <Boldify>Domaine : </Boldify>
                {info.offer_job_field}
              </p>
              {info.offer_stack !== "N/A" && (
                <p>
                  <Boldify>Technos : </Boldify>
                  {info.offer_stack}
                </p>
              )}
              {info.offer_min_compensation > 0 && (
                <p>
                  <Boldify>Salaire min : </Boldify>
                  {info.offer_min_compensation}
                </p>
              )}
              {info.offer_max_compensation > 0 && (
                <p>
                  <Boldify>Salaire max : </Boldify>
                  {info.offer_max_compensation}
                </p>
              )}
              {info.offer_remote_days !== "N/A" && (
                <p>
                  <Boldify>Jour de télétravail autorisés : </Boldify>
                  {info.offer_remote_days}
                </p>
              )}
              {info.offer_education !== "N/A" && (
                <p>
                  <Boldify>Diplôme requis : </Boldify>
                  {info.offer_education}
                </p>
              )}
            </div>
            <div>
              <h3>Information sur l'entreprise</h3>
              <p>
                <Boldify>Entreprise : </Boldify>
                <Link to={`../entreprise/${info.entreprise_id}`}>
                  <Underline>{info.entreprise_name}</Underline>
                </Link>
              </p>
              <p>
                <Boldify>Taille : </Boldify>
                {info.entreprise_size}
              </p>
              <p>
                <Boldify>Secteur : </Boldify>
                {info.entreprise_industry}
              </p>
            </div>
            <div>
              <h3>Personne de contact au sein de l'entreprise</h3>
              <p>{info.entreprise_contact}</p>
              <p>{info.entreprise_contact_email}</p>
              <p>{info.entreprise_contact_telephone}</p>
            </div>
          </div>
        </section>
        <section>
          <h2>Information sur le candidat</h2>
          <div className="grid grid-cols-1 gap-8 bg-white border-l-2 px-4 py-2 md:p-0 md:border-0 md:grid-cols-3 md:gap-20 ">
            <div>
              <h3>Coordonnées</h3>
              <p>
                <Boldify>Nom : </Boldify>
                <Link to={`../user/${info.user_id.toString()}`}>
                  <Underline>{info.user}</Underline>
                </Link>
              </p>
              <p>
                <Boldify>Email : </Boldify>
                {info.user_email}
              </p>
              <p>
                <Boldify>Telephone : </Boldify>
                {info.user_telephone}
              </p>
              <p>
                <Boldify>Ville : </Boldify>
                {info.user_city}
              </p>
              <p>
                <Boldify>Méthode de contact préférée : </Boldify>
                {info.user_favcontactmethod}
              </p>
              <p>
                <Boldify>CV : </Boldify>
              </p>
              <p
                className={`font-bold ${
                  info.user_status === "Actif"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span className="text-black">Statut : </span>
                {info.user_status}
              </p>
            </div>
            <div>
              <h3>Préférences de rercherche</h3>
              {info.search_preferences_city !== "N/A" && (
                <p>
                  <Boldify>Lieu : </Boldify>
                  {info.search_preferences_city}
                </p>
              )}
              {info.search_preferences_stack !== "N/A" && (
                <p>
                  <Boldify>Technos : </Boldify>
                  {info.search_preferences_stack}
                </p>
              )}
              {info.search_preferences_job_field !== "N/A" && (
                <p>
                  <Boldify>Domaine : </Boldify>
                  {info.search_preferences_job_field}
                </p>
              )}
              {info.search_preferences_compensation !== 0 && (
                <p>
                  <Boldify>Salaire souhaité : </Boldify>
                  {info.search_preferences_compensation}
                </p>
              )}
              {info.search_preferences_entreprise_size !== "N/A" && (
                <p>
                  <Boldify>Taille d'entreprise :</Boldify>
                  {info.search_preferences_entreprise_size}
                </p>
              )}
              {info.search_preferences_industry !== "N/A" && (
                <p>
                  <Boldify>Secteur : </Boldify>
                  {info.search_preferences_industry}
                </p>
              )}
              {info.search_preferences_remote_days !== "N/A" && (
                <p>
                  <Boldify>
                    Nombre de jour de télétravail autorisés par semaine :{" "}
                  </Boldify>
                  {info.search_preferences_remote_days}
                </p>
              )}
              {info.search_preferences_education !== "N/A" && (
                <p>
                  <Boldify>Diplôme requis : </Boldify>
                  {info.search_preferences_education}
                </p>
              )}
            </div>
          </div>
        </section>
        <section>
          <h2>Procédures</h2>
          <div className="space-y-8 bg-white border-l-2 px-4 py-2 md:p-0 md:border-0 ">
            {!!info.specific_cv && (
              <div>
                <h2>CV</h2>
                <p>{info.specific_cv}</p>
              </div>
            )}
            <div>
              <h3>Messages</h3>
              {messages.length > 0 &&
                messages.map((elt) => {
                  return (
                    <p>
                      <strong>
                        {elt.origin === "user" ? "candidat" : "entreprise"} (
                        {elt.time})
                      </strong>{" "}
                      {elt.content}{" "}
                    </p>
                  );
                })}
            </div>
            <div>
              <h3>Entretiens</h3>
              {interviews.length > 0 &&
                interviews.map((elt) => {
                  elt.date = new Date(elt.date);
                  console.log(elt.date);
                  return (
                    <p>
                      {elt.date.toLocaleDateString("locale", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      - {elt.date.getHours()}H{elt.date.getMinutes()} :{" "}
                      {elt.is_visio ? "En visio" : elt.location}
                    </p>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    );
}
