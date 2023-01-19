import { Link } from "react-router-dom";

export default function OfferCard({ job }) {
  return (
    <Link to={`../offre/${job.id.toString()}`}>
      <div className="group">
        <div className="flex justify-between gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl group-hover:text-blue-700">
            {job.title}
          </h2>
          <p className="text-base sm:text-lg">
            {new Date(job.date).toLocaleString().split(" ")[0]}
          </p>
        </div>
        <p>
          {job.min_compensation.toLocaleString()} € |{" "}
          {job.max_compensation.toLocaleString()} €
        </p>
        <p className="text-lg sm:text-xl md:text-2xl m-0 absolute right-4 bottom-4 text-rose-600 font-extrabold">
          {job.entreprise_name}
        </p>
      </div>
    </Link>
  );
}
