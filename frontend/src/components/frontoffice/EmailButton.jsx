import { Tooltip } from "@material-tailwind/react";
import { MdOutlineEmail } from "react-icons/md";

export default function EmailButton({ isMessageOpen, setIsMessageOpen }) {
  return (
    <Tooltip content="Contact" className="font-bold text-slate-900 text-center">
      <button
        type="button"
        className="hover:text-rose-600 rounded-full w-[2.5em] h-[2.5em] flex justify-center items-center"
        onClick={() => setIsMessageOpen(!isMessageOpen)}
      >
        <MdOutlineEmail size="2.5em" color="inherit" />
      </button>
    </Tooltip>
  );
}
