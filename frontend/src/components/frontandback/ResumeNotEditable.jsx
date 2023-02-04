import Boldify from "@components/frontandback/Boldify";
import Underline from "./Underline";

export default function ResumeNotEditable({
  exp1Title,
  exp1Content,
  exp1Entreprise,
  exp1Duration,
  exp2Title,
  exp2Content,
  exp2Entreprise,
  exp2Duration,
  cv,
}) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4  text-slate-800">Experience n° 1</h2>
        {exp1Title ? (
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
        ) : (
          <Underline tailwindClasses="italic">Non renseigné</Underline>
        )}
      </section>
      <section>
        <h2 className="mb-4  text-slate-800">Experience n° 2</h2>
        {exp2Title ? (
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
        ) : (
          <Underline tailwindClasses="italic">Non renseigné</Underline>
        )}
      </section>
      <section className="flex h-[42px] gap-4">
        <p className="flex items-center w-full gap-2" htmlFor="isActive">
          <Boldify>CV : </Boldify>
          <a
            target="_blank"
            href={`http://localhost:5001/users/1/resumes/files?fileName=${encodeURI(
              cv?.name?.replace(/\s/g, "-")
            )}`}
            className="underline"
            rel="noreferrer"
          >
            {cv?.name}
          </a>
        </p>
      </section>
    </div>
  );
}
