import Boldify from "@components/frontandback/Boldify";
import { useState } from "react";

export default function ResumeForm({
  exp1Title,
  exp1Content,
  exp1Entreprise,
  exp1Duration,
  exp2Title,
  exp2Content,
  exp2Entreprise,
  exp2Duration,
  setCv,
  setExp1Title,
  setExp1Content,
  setExp1Entreprise,
  setExp1Duration,
  setExp2Entreprise,
  setExp2Title,
  setExp2Content,
  setExp2Duration,
  cv,
}) {
  const [isEditingCvFile, setIsEditingCvFile] = useState(false);
  return (
    <form className=" w-full space-y-12">
      <section>
        <h3>Experience n°1</h3>
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
      </section>
      <section>
        <h3>Experience n°2</h3>
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
      </section>

      <div className="flex gap-10">
        {isEditingCvFile ? (
          <input
            target="_blank"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setCv(e.target.files[0]);
              }
            }}
          />
        ) : (
          <p className="flex items-center w-full gap-2" htmlFor="isActive">
            <Boldify>CV : </Boldify>
            <a
              href={`http://localhost:5001/users/1/resumes/files?fileName=${encodeURI(
                cv?.name?.replace(/\s/g, "-")
              )}`}
              className="underline"
            >
              {cv?.name}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={() => setIsEditingCvFile(!isEditingCvFile)}
        >
          Change
        </button>
      </div>
    </form>
  );
}
