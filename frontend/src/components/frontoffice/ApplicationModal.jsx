import ResumeNotEditable from "@components/frontandback/ResumeNotEditable";
import { UserInfoContext } from "@components/frontandback/UserContext";
import Modal from "@mui/material/Modal";
import FrontButton from "@pages/frontoffice/FrontButton";
import {
  addPropositionResume,
  createMessageThread,
  createProposition,
  getUserResume,
} from "@services/APIcall";
import { propositionSentNotification } from "@services/notificationStore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "./ResumeForm";

export default function ApplicationModal({
  title,
  isApplicationModalOpen,
  setIsApplicationModalOpen,
  offerId,
  consultantId,
}) {
  const { userInfo } = useContext(UserInfoContext);
  const { id: userId } = userInfo;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Form data
  const [cv, setCv] = useState();
  const [exp1Title, setExp1Title] = useState();
  const [exp1Content, setExp1Content] = useState();
  const [exp1Entreprise, setExp1Entreprise] = useState();
  const [exp1Duration, setExp1Duration] = useState();
  const [exp2Title, setExp2Title] = useState();
  const [exp2Content, setExp2Content] = useState();
  const [exp2Entreprise, setExp2Entreprise] = useState();
  const [exp2Duration, setExp2Duration] = useState();
  const [message, setMessage] = useState("");

  const getResume = async () => {
    const [resume] = await getUserResume(userId);
    setCv({ name: resume.cv });
    setExp1Title(resume.exp_1_title);
    setExp1Content(resume.exp_1_content);
    setExp1Entreprise(resume.exp_1_entreprise);
    setExp1Duration(resume.exp_1_duration);
    setExp2Entreprise(resume.exp_2_entreprise);
    setExp2Title(resume.exp_2_title);
    setExp2Content(resume.exp_2_content);
    setExp2Duration(resume.exp_2_duration);
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const sendApplication = async () => {
    const payload = {
      exp1Title,
      exp1Content,
      exp1Entreprise,
      exp1Duration,
      exp2Title,
      exp2Content,
      exp2Entreprise,
      exp2Duration,
      cv: cv.type ? cv : cv.name ? cv.name : null,
    };
    if (cv.type) payload.cv = cv;

    const { insertId: propositionResumeId } = await addPropositionResume(
      payload,
      userId
    );

    const object = `Candidature au poste de ${title}`;
    const propositionInitiative = "user";

    const messageThread = await createMessageThread(
      {
        object,
        consultantId,
        content: message,
        origin: "user",
      },
      userId
    );

    await createProposition({
      userId,
      offerId,
      propositionResumeId,
      propositionInitiative,
      messageThreadId: messageThread.insertId,
    });

    navigate("../../..");

    // Notif
    propositionSentNotification(propositionInitiative);
  };

  useEffect(() => {
    getResume();
  }, [isApplicationModalOpen]);

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
      <div className="bg-white p-8 sm:p-16 w-10/12 max-w-[700px] max-h-screen overflow-y-auto">
        <h1 className="mb-0 text-2xl sm:mb-2 sm:text-3xl">{title}</h1>
        <h2 className=" text-gray-400 italic mt-0">Candidature</h2>
        {!isEditing ? (
          <ResumeNotEditable
            exp1Title={exp1Title}
            exp1Content={exp1Content}
            exp1Entreprise={exp1Entreprise}
            exp1Duration={exp1Duration}
            exp2Title={exp2Title}
            exp2Content={exp2Content}
            exp2Entreprise={exp2Entreprise}
            exp2Duration={exp2Duration}
            cv={cv}
          />
        ) : (
          <ResumeForm
            exp1Title={exp1Title}
            exp1Content={exp1Content}
            exp1Entreprise={exp1Entreprise}
            exp1Duration={exp1Duration}
            exp2Title={exp2Title}
            exp2Content={exp2Content}
            exp2Entreprise={exp2Entreprise}
            exp2Duration={exp2Duration}
            setCv={setCv}
            setExp1Title={setExp1Title}
            setExp1Content={setExp1Content}
            setExp1Entreprise={setExp1Entreprise}
            setExp1Duration={setExp1Duration}
            setExp2Entreprise={setExp2Entreprise}
            setExp2Title={setExp2Title}
            setExp2Content={setExp2Content}
            setExp2Duration={setExp2Duration}
            cv={cv}
          />
        )}
        {!isEditing && (
          <div className="w-full  flex justify-end">
            <FrontButton
              buttonType="secondary"
              content="EDITER"
              onClick={toggleIsEditing}
            />
          </div>
        )}

        <textarea
          className="w-full h-40 p-2"
          placeholder="Lettre de motivation / Message d'accompagnement ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FrontButton
          buttonType="primary"
          content="ENVOYER"
          onClick={sendApplication}
        />
      </div>
    </Modal>
  );
}
