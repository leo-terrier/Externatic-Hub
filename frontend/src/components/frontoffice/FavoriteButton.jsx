import { Tooltip } from "@material-tailwind/react";
import { AiOutlineHeart } from "react-icons/ai";

export default function favoriteButton() {
  return (
    <Tooltip
      content="Ajouter aux favoris"
      className="font-extrabold text-slate-900 text-center"
    >
      <button
        type="button"
        className="hover:text-rose-600 rounded-full w-[2.5em] h-[2.5em] flex justify-center items-center"
      >
        <AiOutlineHeart size="2.5em" color="inherit" />
      </button>
    </Tooltip>
  );
}
