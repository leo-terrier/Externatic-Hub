import Modal from "@mui/material/Modal";
import FrontButton from "@pages/frontoffice/FrontButton";
import { createMessageThread, createProposition } from "@services/APIcall";
import { propositionSentNotification } from "@services/notificationStore";
import { useEffect, useState } from "react";

export default function NewPropositionEmailModal({
  userName,
  userId,
  offer,
  isPropositionEmailModalOpen,
  setIsPropositionEmailModalOpen,
}) {
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");

  const handleSendProposition = async () => {
    const origin = "entreprise";
    const propositionInitiative = "entreprise";
    const messageThread = await createMessageThread(
      {
        object,
        consultantId: offer.consultantId,
        content,
        origin,
        userId,
      },
      userId
    );
    await createProposition({
      userId,
      offerId: offer.id,
      specificResumeId: null,
      propositionInitiative,
      messageThreadId: messageThread.insertId,
    });
    setIsPropositionEmailModalOpen(false);
    propositionSentNotification(origin);
  };
  useEffect(() => {
    if (offer) {
      setObject(`Nouvelle proposition : ${offer.title}`);
      setContent(`Entreprise : ${offer.entrepriseName}\nLieu: ${offer.city}`);
    }
  }, [offer]);

  return (
    <Modal
      open={isPropositionEmailModalOpen}
      onClose={() => setIsPropositionEmailModalOpen(false)}
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
          Proposez cette offre à {userName}
        </h1>
        <div className="flex gap-2 w-full items-center">
          <label className="hidden sm:block w-16" htmlFor="object">
            Objet :
          </label>
          <input
            className="w-full"
            value={object}
            onChange={(e) => setObject(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="p-2 h-96 w-full"
            placeholder="Bonjour, cette offre pourrait vous interreser"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <FrontButton content="ENVOYER" onClick={handleSendProposition} />
        </div>
      </form>
    </Modal>
  );
}
