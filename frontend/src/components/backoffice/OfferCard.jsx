import Boldify from "@components/frontandback/Boldify";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <li className="text-black">
      <Link to={`../../back/offre/${offer.id.toString()}`}>
        <h2 className="text-xl mb-0">
          {offer.title} (id : {offer.id})
        </h2>

        <p className="text-lg font-bold text-rose-600 mb-0 ">
          {offer.entreprise_name}{" "}
        </p>

        <div className="flex gap-2 my-2 px-4 w-full ">
          <ul className="flex flex-col flex-wrap text-zinc-900 gap-1">
            <li className="text-zinc-900">
              <Boldify>Ville</Boldify> : {offer.city}
            </li>
            <li className="text-zinc-900">
              <Boldify>Domaine</Boldify> : {offer.job_field}
            </li>
            <li>
              <Boldify>Technos</Boldify> :{" "}
              {offer.stack.length > 100
                ? `${offer.stack.slice(0, 20)} ...`
                : offer.stack}
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center italic font-semibold text-sm">
          <p className="mb-0">
            {new Date(offer.date).toLocaleString().split(" ")[0]}
          </p>
          <p className=" mb-0">
            {offer.consultant} -{" "}
            <span
              className={`${
                offer.status === "Active"
                  ? "text-green-500"
                  : offer.status === "Non-pourvue"
                  ? "text-red-500"
                  : "text-purple-500"
              }`}
            >
              {offer.status}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
