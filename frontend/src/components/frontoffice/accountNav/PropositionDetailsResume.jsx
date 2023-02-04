import { getPropositionResume } from "@services/APIcall";
import { useEffect, useState } from "react";
import ResumeNotEditable from "../../frontandback/ResumeNotEditable";

export default function PropositionDetailsResume({ propositionId }) {
  const [resume, setResume] = useState(null);

  const getResume = async () => {
    const [cv] = await getPropositionResume(propositionId);
    setResume({
      exp1Title: cv.exp_1_title,
      exp1Content: cv.exp_1_content,
      exp1Entreprise: cv.exp_1_entreprise,
      exp1Duration: cv.exp_1_duration,
      exp2Title: cv.exp_2_title,
      exp2Content: cv.exp_2_content,
      exp2Entreprise: cv.exp_2_entreprise,
      exp2Duration: cv.exp_2_duration,
      cv: { name: cv.cv },
    });
  };

  useEffect(() => {
    getResume();
  }, []);

  if (resume) {
    return (
      <ResumeNotEditable
        exp1Title={resume.exp1Title}
        exp1Content={resume.exp1Content}
        exp1Entreprise={resume.exp1Entreprise}
        exp1Duration={resume.exp1Duration}
        exp2Title={resume.exp2Title}
        exp2Content={resume.exp2Content}
        exp2Entreprise={resume.exp2Entreprise}
        exp2Duration={resume.exp2Duration}
        cv={resume.cv}
      />
    );
  }
}
