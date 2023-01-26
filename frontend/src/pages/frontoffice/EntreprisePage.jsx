import Listing from "@components/frontandback/Listing";
import Listings from "@components/frontandback/Listings";
import OfferCard from "@components/frontoffice/OfferCard";
import { Pagination } from "@mui/material";
import { getEntrepriseById, getEntrepriseOffers } from "@services/APIcall";
import { Underline } from "@services/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EntreprisePage() {
  const [info, setInfo] = useState({});
  const [activeOffers, setActiveOffers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { id: entrepriseId } = useParams();

  function getEntrepriseInfo() {
    getEntrepriseById(entrepriseId).then((res) => setInfo(res));
    getEntrepriseOffers(entrepriseId).then((res) =>
      setActiveOffers(res.filter((elt) => elt.status === "Active"))
    );
  }

  useEffect(getEntrepriseInfo, []);

  if (Object.keys(info).length) {
    return (
      <div className="offerPageDiv space-y-8 sm:space-y-12">
        <div>
          <h1 className="mb-12 italic text-rose-600 border-b-4 border-zinc-900">
            {info.name}
          </h1>
          <h2 className="mb-8">Infos sur l'Entreprise</h2>
          <div className="flex flex-col items-start bg-slate-300	rounded gap-2 p-4 sm:py-4  font-bold flex justify-between w-full sm:flex-row sm:px-16 sm:items-center ">
            <p className="mb-0">
              <Underline>Nombre d'offre à pourvoir</Underline> :{" "}
              {activeOffers.length}
            </p>
            <p className="mb-0">
              <Underline>Secteur</Underline> : {info.industry}{" "}
            </p>
            <p className="mb-0">
              <Underline>Taille</Underline> : {info.size}{" "}
            </p>
          </div>
        </div>
        <div className="my-12">
          <h2 className="mb-8">Description</h2>
          <p className="whitespace-pre-line">{info.description}</p>
        </div>
        <div>
          <h2 className="mb-8">Offres actives</h2>
          <Listings>
            {activeOffers
              .filter(
                (_, i) => i >= 10 * (pageNumber - 1) && i < 10 * pageNumber
              )
              .map((job) => (
                <Listing key={job.id}>
                  <OfferCard job={job} />
                </Listing>
              ))}
          </Listings>
        </div>
        <div
          className={`flex justify-center ${
            activeOffers.length < 10 ? "hidden" : ""
          }`}
        >
          <Pagination
            count={Math.ceil(activeOffers.length / 10)}
            onChange={(_, value) => setPageNumber(value)}
          />
        </div>
      </div>
    );
  }
}
