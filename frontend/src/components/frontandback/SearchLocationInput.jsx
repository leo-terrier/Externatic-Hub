import { dptCode } from "@assets/form-options/dpt";
import { UserInfoContext } from "@components/frontandback/UserContext";
import { useContext, useEffect } from "react";

let autoComplete;

async function handlePlaceSelect(setCity, setGeopoints) {
  const addressObject = autoComplete.getPlace();
  console.log(addressObject);
  const selectedCity = addressObject.formatted_address
    .split(",")[0]
    .replace(/\d/g, "");
  setCity(
    `${selectedCity} (${
      dptCode[addressObject.address_components[1].long_name]
    })`
  );
  console.log([
    addressObject.geometry.location.lng(),
    addressObject.geometry.location.lat(),
  ]);
  setGeopoints([
    addressObject.geometry.location.lng(),
    addressObject.geometry.location.lat(),
  ]);
}

function handleScriptLoad(setCity, setGeopoints, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ["(cities)"],
      componentRestrictions: { country: "fr" },
      formatSuggestion(suggestion) {
        return `${
          suggestion.formatted_address
        } (Lat: ${suggestion.geometry.location.lat()}, Lng: ${suggestion.geometry.location.lng()})`;
      },
    }
  );
  autoComplete.setFields([
    "address_components",
    "formatted_address",
    "geometry",
  ]);

  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(setCity, setGeopoints)
  );
}

function SearchLocationInput({
  city,
  setCity,
  setGeopoints,
  /* tailwindClasses , */
  autoCompleteRef,
  placeholder,
}) {
  const store = useContext(UserInfoContext);
  console.log(store);

  useEffect(() => {
    if (window.google) {
      handleScriptLoad(setCity, setGeopoints, autoCompleteRef);
    } else {
      const googleScript = document.getElementById("gmap-script");
      googleScript.addEventListener("load", () => {
        handleScriptLoad(setCity, setGeopoints, autoCompleteRef);
      });
    }
  }, []);

  return (
    <input
      type="text"
      ref={autoCompleteRef}
      onChange={(event) => {
        console.log(event.target.value);
        setCity(event.target.value);
        setGeopoints([]);
      }}
      placeholder={placeholder}
      value={city}
    />
  );
}

export default SearchLocationInput;
