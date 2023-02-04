import { Link } from "react-router-dom";

export default function EntrepriseCard({ entreprise }) {
  return (
    <li className="text-black">
      <Link to={entreprise.id.toString()}>
        <h2 className="text-xl mb-2 text-rose-600">
          {entreprise.name} (id : {entreprise.id})
        </h2>
        <div className="flex gap-2">
          <div className="w-full flex flex-col border-r-2 border-slate-400">
            <h4 className="text-center mb-0">Activité</h4>
            <ul className="flex flex-col justify-evenly mt-1">
              <li>
                <p className="mb-1">
                  {entreprise.nb_active_offers} offres actives
                </p>
              </li>
              <li>
                <p className="mb-1">
                  {entreprise.nb_filled_offers} offres pourvues
                </p>
              </li>
              <li>
                <p className="mb-1">
                  {entreprise.nb_unfilled_offers} offres non-pourvues
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full text-sm flex flex-col font-bold text-center">
            <h4 className=" mb-0">Informations</h4>
            <ul className="flex flex-col mt-1 items-center">
              <li>
                <p className="mb-1">{entreprise.size}</p>
              </li>
              <li>
                <p className="mb-1">{entreprise.industry}</p>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
}
