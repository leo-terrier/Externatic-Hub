import { useEffect, useState } from "react";
import { getUserSearchPreferences } from "./APIcall";

export const serializeStrAndArr = (obj) => {
  const str = [];
  Object.keys(obj).forEach((property) => {
    if (typeof obj[property] === "string") {
      str.push(
        `${encodeURIComponent(property)}=${encodeURIComponent(obj[property])}`
      );
    } /* typeof obj[property] === array */ else {
      const subString = [];
      obj[property].forEach((elt) => {
        subString.push(
          `${encodeURIComponent(property)}=${encodeURIComponent(elt)}`
        );
      });
      str.push(subString.join("&"));
    }
  });
  return str.join("&");
};

export const addThousandSeparator = (str) => {
  return str && str !== 0 ? str.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "";
};

/* export const renameFieldToSqlCol = (str) => {
  const obj = {
    mySqlCol: "t1.id",
    mySqlCol: "t1.date",
    mySqlCol: "t1.city",
    mySqlCol: "t1.title",
    mySqlCol: "t1.job_field",
    mySqlCol: "t1.min_compensation",
    mySqlCol: "t1.max_compensation",
    mySqlCol: "t1.content",
    mySqlCol: "t1.stack",
    mySqlCol: "t4.name",
  };
  return obj[str];
}; */

export const toggleLikeAccordion = (statesArr, stateName) => {
  console.log("statesArr");
  console.log("stateName");
  console.log(statesArr);
  console.log(stateName);
  statesArr.forEach((arr) => {
    if (arr[0] === stateName) arr[2]((prev) => !prev);
    if (arr[0] !== stateName && arr[1]) arr[2](false);
  });
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const fetchSearchPreferencesAndApplyToState = async (
  userId,
  setQueryStr,
  setCity,
  setJobFields,
  setEntrepriseSizes,
  setIndustries,
  setCompensation,
  setMinMaxRemoteDays,
  setGeopoints,
  setDistance
) => {
  const preferences = await getUserSearchPreferences(userId);

  Object.keys(preferences).forEach((property) => {
    if (typeof preferences[property] === "number")
      preferences[property] = preferences[property].toString();
  });

  setQueryStr(preferences.query || "");
  setCity(preferences.city || "");
  setJobFields(preferences.job_fields ? preferences.job_fields.split(",") : []);
  setEntrepriseSizes(
    preferences.entreprise_sizes ? preferences.entreprise_sizes.split(",") : []
  );
  setIndustries(
    preferences.industries ? preferences.industries.split(",") : []
  );
  setCompensation(preferences.compensation || "");
  setMinMaxRemoteDays([
    preferences.min_remote_days,
    preferences.max_remote_days,
  ]);
  setGeopoints(
    preferences.geopoints ? Object.values(preferences.geopoints) : []
  );
  setDistance(preferences.distance);
};
