import { UserInfoContext } from "@components/frontandback/UserContext";
import { getUserResume, modifyUserResume } from "@services/APIcall";
import { Boldify } from "@services/utils";
import { useContext, useEffect, useState } from "react";
import FrontButton from "../../../pages/frontoffice/FrontButton";

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
    setCv(resume.cv);
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
      id,
    };
    modifyUserResume(payload);
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
    console.log(exp1Title, exp1Content, exp2Title, exp2Content);
  }, []);

  return (
    <div className="flex justify-between">
      <form className=" w-full space-y-12">
        <section>
          <h2 className="mb-4  text-slate-800">Experience n° 1</h2>
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <label htmlFor="exp1Title">Intitutlé du poste : </label>
                <input
                  type="text"
                  id="exp1Title"
                  value={exp1Title}
                  onChange={(e) => setExp1Title(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="exp1Entreprise">Entreprise : </label>
                <input
                  type="text"
                  htmlFor="exp1Entreprise"
                  value={exp1Entreprise}
                  onChange={(e) => setExp1Entreprise(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="exp1Duration">Durée : </label>
                <input
                  type="text"
                  htmlFor="exp1Duration"
                  value={exp1Duration}
                  onChange={(e) => setExp1Duration(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <textarea
                  type="text"
                  htmlFor="exp1Content"
                  value={exp1Content}
                  onChange={(e) => setExp1Content(e.target.value)}
                  placeholder="Description..."
                  className="w-full h-96 my-4"
                />
              </div>
            </div>
          ) : (
            <div className="text-slate-700 space-y-2">
              <h3 className="mb-2">
                <Boldify>{exp1Title}</Boldify>
              </h3>
              <div className="flex gap-2">
                <p className="">Entreprise : </p>{" "}
                <p className="">
                  {exp1Entreprise} (durée : {exp1Duration})
                </p>
              </div>
              <p className="text-gray-500 whitespace-pre-line">{exp1Content}</p>
            </div>
          )}
        </section>
        <section>
          <h2 className="mb-4  text-slate-800">Experience n° 2</h2>
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <label htmlFor="exp2Title">Intitutlé du poste : </label>
                <input
                  type="text"
                  id="exp2Title"
                  value={exp2Title}
                  onChange={(e) => setExp2Title(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="exp2Entreprise">Entreprise : </label>
                <input
                  type="text"
                  htmlFor="exp2Entreprise"
                  value={exp2Entreprise}
                  onChange={(e) => setExp2Entreprise(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="exp2Duration">Durée : </label>
                <input
                  type="text"
                  htmlFor="exp2Duration"
                  value={exp2Duration}
                  onChange={(e) => setExp2Duration(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <textarea
                  type="text"
                  htmlFor="exp2Content"
                  value={exp2Content}
                  onChange={(e) => setExp2Content(e.target.value)}
                  placeholder="Description..."
                  className="w-full h-96 my-4"
                />
              </div>
            </div>
          ) : (
            <div className="text-slate-700 space-y-2">
              <h3 className="mb-2">
                <Boldify>{exp2Title}</Boldify>
              </h3>
              <div className="flex gap-2">
                <p className="">Entreprise : </p>{" "}
                <p className="">
                  {exp2Entreprise} (durée : {exp2Duration})
                </p>
              </div>
              <p className="text-gray-500 whitespace-pre-line">{exp2Content}</p>
            </div>
          )}
        </section>
        <section className="flex h-[42px] gap-4">
          <label className="flex items-center w-full" htmlFor="isActive">
            <Boldify>CV : </Boldify>
          </label>
          {isEditing ? (
            <input className="" type="file" />
          ) : (
            <p className="mb-0 w-full flex items-center">{cv}</p>
          )}
        </section>
        <div className="w-full  flex justify-end">
          <FrontButton
            content={isEditing ? "SAUVEGARDER" : "EDITER"}
            type="button"
            onClick={toggleIsEditing}
            isPrimary={isEditing}
          />
        </div>
      </form>
    </div>
  );
}
