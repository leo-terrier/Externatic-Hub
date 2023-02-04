import Boldify from "@components/frontandback/Boldify";
import Underline from "@components/frontandback/Underline";
import { UserInfoContext } from "@components/frontandback/UserContext";
import SearchPreferenceAccordionModal from "@components/frontoffice/SearchPreferenceAccordionModal";
import { fetchSearchPreferencesAndApplyToState } from "@services/utils";

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

  const loadPreferences = async () => {
    await fetchSearchPreferencesAndApplyToState(
      id,
      setQueryStr,
      setCity,
      setJobFields,
      setEntrepriseSizes,
      setIndustries,
      setCompensation,
      setMinMaxRemoteDays,
      setGeopoints,
      setDistance
    );
    setIsHydrated(true);
  };

  useEffect(() => {
    loadPreferences();
  }, []);

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
          />
        ) : (
          <>
            {" "}
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex gap-2">
                <p>
                  <Boldify>Mots clé : </Boldify>
                </p>
                <p>
                  {queryStr || (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Ville : </Boldify>
                </p>
                <p>
                  {city || (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>

              <div className="flex gap-2">
                <p>
                  <Boldify>Domaine : </Boldify>
                </p>
                <p>
                  {jobFields.length ? (
                    jobFields.join(", ")
                  ) : (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Entreprise : </Boldify>
                </p>
                <p>
                  {entrepriseSizes.length ? (
                    entrepriseSizes.join(", ")
                  ) : (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Secteur : </Boldify>
                </p>
                <p>
                  {industries.length ? (
                    industries.join(", ")
                  ) : (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Salaire (brut annuel) : </Boldify>
                </p>
                <p>
                  {compensation || (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p>
                  <Boldify>Télétravail : </Boldify>
                </p>
                <p>
                  {minMaxRemoteDays[0] ? (
                    `Entre ${minMaxRemoteDays[0]} et ${minMaxRemoteDays[1]} par
                  semaine`
                  ) : (
                    <Underline tailwindClasses="italic">
                      Non renseigné
                    </Underline>
                  )}
                </p>
              </div>
            </div>
            <div className="w-2/12 self-end flex justify-center">
              <FrontButton
                content={isEditing ? "SAUVEGARDER" : "EDITER"}
                onClick={() => setIsEditing(!isEditing)}
                buttonType={isEditing ? "primary" : "secondary"}
              />
            </div>
          </>
        )}
      </form>
    );
  }
}
