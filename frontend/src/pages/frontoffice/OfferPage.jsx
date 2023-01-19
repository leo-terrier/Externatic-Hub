import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApplicationModal from "@components/frontoffice/ApplicationModal";
import EmailButton from "@components/frontoffice/EmailButton";
import EmailModal from "@components/frontoffice/EmailModal";
import FavoriteButton from "@components/frontoffice/FavoriteButton";
import { getOfferById } from "@services/APIcall";
import { Boldify, Underline } from "@services/utils";

function Compensation({ info }) {
  const { min_compensation, max_compensation } = info;
  if (!min_compensation && !max_compensation) return "";
  if (min_compensation === max_compensation) {
    return (
      <li>
        <Boldify>Salaire</Boldify> : {min_compensation.toLocaleString()} €
      </li>
    );
  }
  return (
    <li>
      <Boldify>Salaire</Boldify> : entre {min_compensation.toLocaleString()} €
      et {max_compensation.toLocaleString()} €
    </li>
  );
}

export default function OfferPage() {
  const [info, setInfo] = useState({});
  const { id } = useParams();

  // OPEN / CLOSED MODAL STATE
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(function () {
    getOfferById(id).then(function (res) {
      res.min_compensation = parseInt(res.min_compensation, 10);
      res.max_compensation = parseInt(res.max_compensation, 10);
      setInfo(res);
    });
  }, []);

  if (Object.keys(info).length) {
    return (
      <div className="offerPageDiv space-y-8 sm:space-y-12">
        <div className="flex flex-col items-center gap-4 sm:flex-row justify-between sm:items-start">
          <div className="flex flex-col ">
            <div className="flex flex-col justify-between items-start gap-2">
              <h1 className=" mb-0 text-2xl sm:text-3xl">{info.title}</h1>
              <p className="text-slate-600 underline text-xl mb-0">
                <Link to={`../entreprise/${info.entreprise_id.toString()}`}>
                  {info.entreprise_name}
                </Link>
              </p>
              <p>{new Date(info.date).toLocaleString().split(" ")[0]}</p>
            </div>
          </div>
          <div className="flex gap-16 sm:gap-8 mt-[-.15em]">
            <EmailButton
              isMessageOpen={isMessageModalOpen}
              setIsMessageOpen={setIsMessageModalOpen}
            />
            <EmailModal
              offerId={info.id}
              isMessageOpen={isMessageModalOpen}
              setIsMessageOpen={setIsMessageModalOpen}
            />
            <FavoriteButton />
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full items-stretch md:flex-row ">
          <div className="w-full bg-slate-300 rounded-lg p-8 flex flex-col items-center md:pb-40 md:min-w-[370px] md:max-w-[370px] ">
            <h3>
              <Underline>En bref</Underline>
            </h3>
            <ul className="space-y-2 list-disc	">
              {info.job_field !== "N/A" && (
                <li>
                  <Boldify>Domaine</Boldify> : {info.job_field}
                </li>
              )}
              <Compensation info={info} />
              {info.stack !== "N/A" && (
                <li>
                  <Boldify>Technos</Boldify> : {info.stack}
                </li>
              )}
              {info.remote_days !== "N/A" && (
                <li>
                  <Boldify>Télétravail autorisé </Boldify> : {info.remote_days}{" "}
                  {/\d/.test(info.remote_days) && "jour(s)"}
                </li>
              )}
              {info.education !== "N/A" && (
                <li>
                  <Boldify>Dipôme requis</Boldify> : {info.education}
                </li>
              )}
            </ul>
          </div>
          <div className="w-full md:pb-40">
            <h3>Description de l'offre</h3>
            <p className="whitespace-pre-line">{info.content}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="ml-2 h-full text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => setIsApplicationModalOpen(!isApplicationModalOpen)}
          >
            Postuler
          </button>
        </div>
        <ApplicationModal
          isApplicationModalOpen={isApplicationModalOpen}
          setIsApplicationModalOpen={setIsApplicationModalOpen}
          title={info.title}
        />
      </div>
    );
  }
}
