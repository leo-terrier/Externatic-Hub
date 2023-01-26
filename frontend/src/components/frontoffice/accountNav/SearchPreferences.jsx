import { UserInfoContext } from "@components/frontandback/UserContext";
import SearchPreferenceAccordionModal from "@components/frontoffice/SearchPreferenceAccordionModal";
import { getUserSearchPreferences } from "@services/APIcall";
import { Boldify } from "@services/utils";
import { useContext, useEffect, useState } from "react";
import FrontButton from "../../../pages/frontoffice/FrontButton";

export default function SearchPreferences() {
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const { id } = userInfo;

  // Form data
  const [queryStr, setQueryStr] = useState();
  const [city, setCity] = useState();
  const [jobFields, setJobFields] = useState();
  const [entrepriseSizes, setEntrepriseSizes] = useState();
  const [industries, setIndustries] = useState();
  const [compensation, setCompensation] = useState();
  const [minMaxRemoteDays, setMinMaxRemoteDays] = useState();
  const [geopoints, setGeopoints] = useState();
  const [distance, setDistance] = useState();

  let preferences;

  const getPreferences = async () => {
    preferences = await getUserSearchPreferences(id);

    Object.keys(preferences).forEach((property) => {
      console.log(
        `${property} : ${preferences[property]} (${typeof preferences[
          property
        ]})`
      );
      if (typeof preferences[property] === "number")
        preferences[property] = preferences[property].toString();
    });

    setQueryStr(preferences.query || "");
    setCity(preferences.city || "");
    setJobFields(
      preferences.job_fields ? preferences.job_fields.split(",") : []
    );
    setEntrepriseSizes(
      preferences.entreprise_sizes
        ? preferences.entreprise_sizes.split(",")
        : []
    );
    setIndustries(
      preferences.industries ? preferences.industries.split(",") : []
    );
    setCompensation(preferences.compensation || "0");
    setMinMaxRemoteDays([
      preferences.min_remote_days,
      preferences.max_remote_days,
    ]);
    setGeopoints(
      preferences.geoPoints ? Object.values(preferences.geoPoints) : []
    );
    setDistance(preferences.distance);
    setIsHydrated(true);
  };

  useEffect(() => {
    getPreferences();
  }, []);

  console.log(queryStr);
  console.log(city);
  console.log(jobFields);
  console.log(entrepriseSizes);

  if (isHydrated) {
    return (
      <form className="flex justify-between">
        {isEditing ? (
          <SearchPreferenceAccordionModal
            queryStr={queryStr}
            setQueryStr={setQueryStr}
            city={city}
            setCity={setCity}
            jobFields={jobFields}
            setJobFields={setJobFields}
            entrepriseSizes={entrepriseSizes}
            setEntrepriseSizes={setEntrepriseSizes}
            industries={industries}
            setIndustries={setIndustries}
            compensation={compensation}
            setCompensation={setCompensation}
            minMaxRemoteDays={minMaxRemoteDays}
            setMinMaxRemoteDays={setMinMaxRemoteDays}
            isInMyAccount
            geopoints={geopoints}
            setGeopoints={setGeopoints}
            distance={distance}
            setDistance={setDistance}
            isFiltersOpen={isEditing}
            setIsFiltersOpen={setIsEditing}
            id={id}
          />
        ) : (
          <>
            {" "}
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex gap-2">
                <p>
                  <Boldify>Mots clé : </Boldify>
                </p>
                <p>{queryStr}</p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Ville : </Boldify>
                </p>
                <p>{city}</p>
              </div>

              <div className="flex gap-2">
                <p>
                  <Boldify>Domaine : </Boldify>
                </p>
                <p>{jobFields.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Entreprise : </Boldify>
                </p>
                <p>{entrepriseSizes.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Secteur : </Boldify>
                </p>
                <p>{industries.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Salaire (brut annuel) : </Boldify>
                </p>
                <p>{compensation}</p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Télétravail : </Boldify>
                </p>
                <p>
                  {" "}
                  Entre {minMaxRemoteDays[0]} et {minMaxRemoteDays[1]} par
                  semaine
                </p>
              </div>
            </div>
            <div className="w-2/12 self-end flex justify-center">
              <FrontButton
                content={isEditing ? "SAUVEGARDER" : "EDITER"}
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                isPrimary={isEditing}
              />
            </div>
          </>
        )}
      </form>
    );
  }
}
