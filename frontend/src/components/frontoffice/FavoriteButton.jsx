import { UserInfoContext } from "@components/frontandback/UserContext";
import { Tooltip } from "@material-tailwind/react";
import { createFavoriteOffer, deleteFavoriteOffer } from "@services/APIcall";
import { requiredLoginNotification } from "@services/notificationStore";

import { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function favoriteButton({ offerId, isFavorite, setInfo }) {
  const { userInfo } = useContext(UserInfoContext);
  const { id: userId } = userInfo;

  const handleToggleFav = () => {
    if (!userId) {
      requiredLoginNotification();
    } else {
      if (isFavorite) {
        deleteFavoriteOffer(userId, offerId);
      } else {
        createFavoriteOffer(userId, offerId);
      }
      setInfo((prev) => ({ ...prev, is_favorite: !prev.is_favorite }));
    }
  };

  return (
    <Tooltip
      content={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="font-extrabold text-slate-900 text-center disabled"
    >
      <button
        onClick={handleToggleFav}
        type="button"
        className={`hover:text-rose-600 rounded-full w-[2.5em] h-[2.5em] flex justify-center items-center ${
          isFavorite ? "text-rose-600" : "text-inherit"
        }`}
      >
        {isFavorite ? (
          <AiFillHeart size="2.5em" color="inherit" />
        ) : (
          <AiOutlineHeart size="2.5em" color="inherit" />
        )}
      </button>
    </Tooltip>
  );
}
