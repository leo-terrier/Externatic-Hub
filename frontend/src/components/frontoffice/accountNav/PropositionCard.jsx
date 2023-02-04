import { useState } from "react";
import { RxTriangleRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import PropositionDetails from "./PropositionDetails";

export default function PropositionCard({ proposition }) {
  const [isPropositionOpen, setIsPropositionOpen] = useState(false);

  return (
    <li key={proposition.id}>
      <div className="py-3 px-4 bg-rose-100 ">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <Link to={`../offre/${proposition.offer_id.toString()}`}>
              <h2 className="text-lg  hover:text-rose-500  mb-0">
                {proposition.title}
              </h2>
            </Link>
            <div
              className={`self-start shrink-0 ${
                proposition.status === "En attente"
                  ? "bg-orange-500"
                  : proposition.status === "Acceptée"
                  ? "bg-green-500"
                  : "bg-red-500"
              } px-4 py-2 rounded-3xl font-bold text-white min-w-52 max-w-52`}
            >
              <p className="mb-0 ">{proposition.status}</p>
            </div>
          </div>
          <div className="flex justify-between gap-4 font-extrabold italic">
            <p className="text-lg  mb-0  text-rose-600 ">
              {proposition.entreprise_name}
            </p>
            <p className="mb-0">
              {proposition.proposition_initiative === "entreprise"
                ? "Proposition reçue le"
                : "Candidature réalisée le "}{" "}
              {new Date(proposition.date).toLocaleString().split(" ")[0]}
            </p>
          </div>
        </div>
      </div>
      <PropositionDetails
        isOpen={isPropositionOpen}
        propositionId={proposition.id}
        userId={proposition.user_id}
      />
      <div className="bg-rose-200 flex justify-center items-center py-1">
        <button
          type="button"
          onClick={() => setIsPropositionOpen(!isPropositionOpen)}
        >
          <div className="flex w-40 gap-0 justify-center items-center text-rose-800">
            <div
              className={`duration-3500 transition-transform ${
                isPropositionOpen ? "-rotate-90" : "rotate-0"
              }`}
            >
              <RxTriangleRight color="inherit" size="1.7em" />
            </div>
            <p className=" text-xl mb-0">DETAILS</p>
          </div>
        </button>
      </div>
    </li>
  );
}
