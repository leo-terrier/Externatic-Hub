import { getOfferById } from "@services/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Offer() {
  const [offerDetails, setOfferDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getOfferById(id).then((res) => {
      setOfferDetails(res);
    });
    // CHECK détails de l'offre (cf DB
    // un tableau avec les propositions reçues, et un tableau avec les proposition effectuées(cf ligne PROPOSITION)
  }, []);

  if (Object.keys(offerDetails).length > 0) {
    return (
      <div>
        {Object.keys(offerDetails).map((property) => {
          return (
            <div>
              {property} : {offerDetails[property]}
            </div>
          );
        })}
      </div>
    );
  }
}
