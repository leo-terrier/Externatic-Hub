import OfferLine from "@components/OfferLine/OfferLine";
import { getOffers } from "@services/utils";
import { useEffect, useState } from "react";

export default function AllOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers().then((res) => setOffers(res));
  }, []);

  return (
    <>
      <h1>Offres</h1>
      <ul>
        {offers.length > 0 &&
          offers.map((offer) => {
            return <OfferLine offer={offer} key={offer.id} />;
          })}
      </ul>
    </>
  );
}
