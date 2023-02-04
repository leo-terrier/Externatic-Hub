import ChangeStatusModal from "@components/backoffice/ChangeStatusModal";
import Boldify from "@components/frontandback/Boldify";
import Interview from "@components/frontandback/Interview";
import ResumeNotEditable from "@components/frontandback/ResumeNotEditable";
import Underline from "@components/frontandback/Underline";
import MessageThread from "@components/frontoffice/MessageThread";
import FrontButton from "@pages/frontoffice/FrontButton";
import {
  getPropositionById,
  getPropositionInterviews,
  getPropositionResume,
  getUserResume,
} from "@services/APIcall";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

export default function Proposition() {
  const [info, setInfo] = useState(null);
  const [resume, setResume] = useState(null);
  const [interviews, setInterviews] = useState(null);

  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);

  const { id } = useParams();

  const loadPropositionDetailsAndSteps = async () => {
    const propositionInfo = await getPropositionById(id);
    setInfo(propositionInfo);
    const [resumeInfo] = propositionInfo.specific_resume_id
      ? await getPropositionResume(id)
      : await getUserResume(propositionInfo.user_id);
    setResume(resumeInfo);
    const interviewInfo = await getPropositionInterviews(id);
    setInterviews(interviewInfo);
  };

  useEffect(() => {
    loadPropositionDetailsAndSteps();
  }, []);

  if (info)
    return (
      <div className="space-y-12">
        <header className="flex flex-col items-start">
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
            le {new Date(info.date).toLocaleString().split(" ")[0]}
          </p>
          <p>
            <Boldify>Consultant : </Boldify> {info.consultant}
          </p>
          <div className="group relative inline">
            <p>
              <Boldify>
                Statut :{" "}
                <span
                  className={` ${
                    info.status === "En attente"
                      ? "text-orange-500"
                      : info.status === "Rejetée"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {info.status}
                </span>
              </Boldify>
            </p>
            {info.status === "En attente" && (
              <button
                type="button"
                onClick={() => setIsChangeStatusModalOpen(true)}
                className="absolute right-[-40px] top-[-6px]  p-2 rounded-full group-hover:border"
              >
                <BsPencilSquare />
              </button>
            )}
            <ChangeStatusModal
              isChangeStatusModalOpen={isChangeStatusModalOpen}
              setIsChangeStatusModalOpen={setIsChangeStatusModalOpen}
            >
              <div className="flex justify-between gap-20 w-full">
                <div className="w-full space-y-8 flex flex-col items-center">
                  <FrontButton
                    content={
                      info.proposition_initiative === "user"
                        ? "Candidature acceptée"
                        : "Proposition acceptée"
                    }
                    buttonType="secondary"
                  />
                  <p>
                    {info.proposition_initiative === "user"
                      ? `Le candidat recevra un email l'informant que sa candidature a été acceptée. Les autres candidats en attente recevront un email les informant que leur candidature n'a pas été retenue`
                      : `L'entreprise recevra un email l'informant que sa proposition n'a pas été retenue.`}
                  </p>
                </div>
                <div className="w-full space-y-8 flex flex-col items-center">
                  <FrontButton
                    content={
                      info.proposition_initiative === "user"
                        ? "Candidature rejetée"
                        : "Proposition rejetée"
                    }
                    buttonType="warning"
                  />
                  <p>
                    {info.proposition_initiative === "user"
                      ? `Le candidat recevra un email l'informant que sa candidature n'a pas été retenue`
                      : `L'entreprise recevra un email l'informant que sa proposition a été refusée.`}
                  </p>
                </div>
              </div>
            </ChangeStatusModal>
          </div>
        </header>
        <section>
          <h2>Offre</h2>
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
          <h2>Candidat</h2>
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
                <Boldify>Statut : </Boldify>
                <span
                  className={`font-bold ${
                    info.user_status === "Actif"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {info.user_status === "Actif"
                    ? "En recherche active"
                    : "Inactif"}
                </span>
              </p>
            </div>
            <div>
              <h3>Préférences de recherche</h3>
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
                  <Boldify>Télétravail :</Boldify>
                  entre {info.search_preferences_min_remote_days} et{" "}
                  {info.search_preferences_max_remote_days} jour(s) par semaine
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
          <h2>
            {info.proposition_initiative === "user"
              ? "Candidature"
              : "Proposition"}
          </h2>
          {resume !== null && (
            <div>
              <h3>CV</h3>
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
            </div>
          )}
          <div>
            <h3>Messages</h3>
            <MessageThread propositionId={id} isBackend />
          </div>
          {interviews !== null && (
            <div>
              <h3>Entretiens</h3>
              {interviews.length > 0 ? (
                interviews.map((interview) => (
                  <Interview interview={interview} />
                ))
              ) : (
                <p>Aucun entretien</p>
              )}
            </div>
          )}
        </section>
      </div>
    );
}
