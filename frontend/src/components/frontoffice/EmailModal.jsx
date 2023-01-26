import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function EmailModal({
  offerId,
  isMessageOpen,
  setIsMessageOpen,
}) {
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");
  return (
    <Modal
      open={isMessageOpen}
      onClose={() => setIsMessageOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <form className="bg-white p-8 sm:p-16 w-10/12 max-w-[700px] flex-col space-y-4">
        <h1 className="mb-7 text-2xl sm:mb-4 sm:text-3xl">
          Contactez le conseiller en charge de ce recrutement
        </h1>
        <div className="flex gap-2 w-full items-center">
          <label className="hidden sm:block w-16" htmlFor="object">
            Objet :
          </label>
          <input
            placeholder={`Demande d'info sur l'offre ${offerId}`}
            className="w-full"
            value={object}
            onChange={(e) => setObject(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="p-2 h-96 w-full"
            placeholder="Bonjour, je souhaiterais obtenir des informations concernant ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="ml-2 h-full text-white bg-blue-700 hover:bg-blue-800 text-lg rounded-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Envoyer
          </button>
        </div>
      </form>
    </Modal>
  );
}
