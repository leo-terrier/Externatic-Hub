import { UserInfoContext } from "@components/frontandback/UserContext";
import { getUserFavorites } from "@services/APIcall";
import { useContext, useEffect, useState } from "react";
import OfferCard from "./OfferCard";

export default function FavoriteOffers() {
  const { userInfo } = useContext(UserInfoContext);
  const [favoriteOffers, setFavoriteOffers] = useState([]);

  useEffect(() => {
    getUserFavorites(userInfo.id).then((res) => {
      setFavoriteOffers(res);
    });
  }, []);

  if (favoriteOffers.length) {
    return (
      <ul className="space-y-8">
        {favoriteOffers.map((offer) => (
          <OfferCard offer={offer} />
        ))}
      </ul>
    );
  }
  return <p>vide</p>;
}
