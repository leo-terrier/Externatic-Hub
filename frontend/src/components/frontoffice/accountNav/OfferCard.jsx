import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <li key={offer.id} className="p-4  bg-rose-100  border-l-2">
      <Link to={`../offre/${offer.id.toString()}`}>
        <div className="group ">
          <div className="flex gap-4 justify-between">
            <h2 className="text-lg  group-hover:text-rose-500 mb-0  mb-0">
              {offer.title}
            </h2>
            <div
              className={`self-start shrink-0 ${
                offer.status === "Active" ? "bg-green-600" : "bg-red-500"
              }  font-bold px-4 py-2 rounded-3xl min-w-52 max-w-52 text-white`}
            >
              <p className="mb-0 ">
                {offer.status === "Active" ? "Offre Active" : "Offre Inactive"}
              </p>
            </div>
          </div>
          <p className="text-lg  mb-0  text-rose-600 font-extrabold">
            {offer.entreprise_name}
          </p>
        </div>
      </Link>
    </li>
  );
}
