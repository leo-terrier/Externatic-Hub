import { UserInfoContext } from "@components/frontandback/UserContext";
import { getUserResume, modifyUserResume } from "@services/APIcall";

import { useContext, useEffect, useState } from "react";
import FrontButton from "../../../pages/frontoffice/FrontButton";
import ResumeNotEditable from "../../frontandback/ResumeNotEditable";
import ResumeForm from "../ResumeForm";

export default function personalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const { id } = userInfo;

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

  const getResume = async () => {
    const [resume] = await getUserResume(id);
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

  const modifyResume = () => {
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
    modifyUserResume(payload, id);
  };

  const toggleIsEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      modifyResume();
      setIsEditing(false);
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  return (
    <div className="space-y-12">
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
          cv={cv}
          setCv={setCv}
          setExp1Title={setExp1Title}
          setExp1Content={setExp1Content}
          setExp1Entreprise={setExp1Entreprise}
          setExp1Duration={setExp1Duration}
          setExp2Entreprise={setExp2Entreprise}
          setExp2Title={setExp2Title}
          setExp2Content={setExp2Content}
          setExp2Duration={setExp2Duration}
        />
      )}
      <div className="w-full  flex justify-end">
        <FrontButton
          content={isEditing ? "SAUVEGARDER" : "EDITER"}
          onClick={toggleIsEditing}
          buttonType={isEditing ? "primary" : "secondary"}
        />
      </div>
    </div>
  );
}
