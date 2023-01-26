import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <Link to={`../offre/${offer.id.toString()}`}>
      <div className="group">
        <div className="flex justify-between gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl group-hover:text-blue-700">
            {offer.title}
          </h2>
          <p className="text-base sm:text-lg">
            {new Date(offer.date).toLocaleString().split(" ")[0]}
          </p>
        </div>
        <p>
          {offer.min_compensation.toLocaleString()} € |{" "}
          {offer.max_compensation.toLocaleString()} €
        </p>
        <p className="text-lg sm:text-xl md:text-2xl m-0 absolute right-4 bottom-4 text-rose-600 font-extrabold">
          {offer.entreprise_name}
        </p>
      </div>
    </Link>
  );
}
