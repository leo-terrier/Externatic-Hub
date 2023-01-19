import { addThousandSeparator, Boldify } from "@services/utils";
import { IoMdClose } from "react-icons/io";

export default function OfferSearchAppliedFilters({
  entrepriseSizes,
  jobFields,
  industries,
  compensation,
  minMaxRemoteDays,
  geopoints,
  city,
  setCity,
  setGeopoints,
  setEntrepriseSizes,
  setJobFields,
  setIndustries,
  setCompensation,
  setMinMaxRemoteDays,
}) {
  const handleDeleteFilter = (state, stateSetter) => {
    if (typeof state === "object") stateSetter([]);
    else if (typeof state === "string") stateSetter("");
  };

  const filterList = [];

  if (city && geopoints.length)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() => {
              setGeopoints([]);
              handleDeleteFilter(city, setCity);
            }}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Ville</Boldify> : {city}
          </p>
        </div>
      </li>
    );
  if (entrepriseSizes.length)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() =>
              handleDeleteFilter(entrepriseSizes, setEntrepriseSizes)
            }
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            {" "}
            <Boldify>Entreprises</Boldify> : {entrepriseSizes.join(", ")}
          </p>
        </div>
      </li>
    );
  if (jobFields.length)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() => handleDeleteFilter(jobFields, setJobFields)}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Domaines</Boldify> : {jobFields.join(", ")}
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
            onClick={() => handleDeleteFilter(industries, setIndustries)}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Secteurs</Boldify> : {industries.join(", ")}
          </p>
        </div>
      </li>
    );
  if (compensation)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button
            type="button"
            onClick={() => handleDeleteFilter(compensation, setCompensation)}
          >
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            <Boldify>Salaire</Boldify> : {addThousandSeparator(compensation)} €
          </p>
        </div>
      </li>
    );
  if (minMaxRemoteDays[0] !== 0 || minMaxRemoteDays[1] !== 5)
    filterList.push(
      <li>
        <div className=" flex items-center gap-1 bg-gray-300 border-[1.5px] border-slate-800 rounded p-2">
          <button type="button" onClick={() => setMinMaxRemoteDays([0, 5])}>
            <IoMdClose size="1.5em" />
          </button>
          <p className="mb-0">
            Entre {minMaxRemoteDays[0]} et {minMaxRemoteDays[1]} jour(s) de
            télétravail
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
