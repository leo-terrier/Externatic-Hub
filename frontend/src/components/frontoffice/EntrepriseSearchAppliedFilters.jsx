import Boldify from "@components/frontandback/Boldify";
import { IoMdClose } from "react-icons/io";

export default function EntrepriseSearchAppliedFilters({
  entrepriseSizes,
  setEntrepriseSizes,
  industries,
  setIndustries,
}) {
  const filterList = [];

  if (entrepriseSizes.length)
    filterList.push(
      <li>
        <div className="flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() => {
              setEntrepriseSizes([]);
            }}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Entreprise</Boldify> : {entrepriseSizes.join(", ")}
          </p>
        </div>
      </li>
    );
  if (industries.length)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() => {
              setIndustries([]);
            }}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Secteur</Boldify> : {industries.join(", ")}
          </p>
        </div>
      </li>
    );
  return (
    <ul
      className={`${
        !filterList.length > 0 ? "hidden" : ""
      } flex gap-2 flex-wrap w-full`}
    >
      {filterList}
    </ul>
  );
}
