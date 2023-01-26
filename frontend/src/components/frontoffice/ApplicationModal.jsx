import Modal from "@mui/material/Modal";
import { useState } from "react";

export default function ApplicationModal({
  title,
  isApplicationModalOpen,
  setIsApplicationModalOpen,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [CV, setCV] = useState("");
  const [message, setMessage] = useState("");
  console.log(email);
  return (
    <Modal
      open={isApplicationModalOpen}
      onClose={() => setIsApplicationModalOpen(false)}
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
        <div>
          <h1 className="mb-0 text-2xl sm:mb-2 sm:text-3xl">{title}</h1>
          <h2 className=" text-gray-400 italic mt-0">Candidature</h2>
        </div>
        <div className="flex flex-col gap-4 p-1 sm:p-12 items-center ">
          <div className="flex gap-4 justify-center sm:justify-between items-center w-full sm:px-8 ">
            <label className="hidden sm:block" htmlFor="name">
              Nom :
            </label>
            <input
              className="w-auto sm:w-8/12"
              placeholder="Nom complet"
              id="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-center sm:justify-between items-center w-full sm:px-8">
            <label className="hidden sm:block" htmlFor="name">
              Email :
            </label>
            <input
              className="w-auto sm:w-8/12"
              placeholder="Email"
              id="email"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-center sm:justify-between items-center w-full sm:px-8">
            <p className="mb-0">CV :</p>
            <p className="mb-0 w-auto sm:w-8/12 text-center">BLANK</p>
          </div>
          <button type="button" className="underline italic font-sm">
            Updloader un CV spécifique
          </button>
        </div>
        <textarea
          className="w-full h-40 p-2"
          placeholder="Lettre de motivation / Message d'accompagnement ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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
