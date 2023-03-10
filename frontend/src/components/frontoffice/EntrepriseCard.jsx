import { Boldify, Underline } from "@services/utils";
import { Link } from "react-router-dom";

export default function EntrepriseCard({ entreprise }) {
  return (
    <Link to={entreprise.id.toString()}>
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <h2 className="mb-2 text-xl text-rose-600 sm:text-2xl md:text-3xl group-hover:text-blue-700">
            {entreprise.name}
          </h2>
          <p className="text-base sm:text-lg md:text-xl">
            <Underline>Nombre d'offres actives</Underline> :{" "}
            {entreprise.nb_active_offers}
          </p>
        </div>
        <p>
          <Boldify>Taille</Boldify> : {entreprise.size}
        </p>
        <p>
          <Boldify>Secteur </Boldify> : {entreprise.industry}
        </p>
      </div>
    </Link>
  );
}
