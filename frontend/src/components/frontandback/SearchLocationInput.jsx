import { useEffect, useRef } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  const script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

async function handlePlaceSelect(setCity, setGeo) {
  const addressObject = autoComplete.getPlace();
  const selectedCity = addressObject.formatted_address
    .split(",")[0]
    .replace(/\d/g, "");
  console.log(addressObject);
  setCity(selectedCity);
  console.log([
    addressObject.geometry.location.lng(),
    addressObject.geometry.location.lat(),
  ]);
  setGeo([
    addressObject.geometry.location.lng(),
    addressObject.geometry.location.lat(),
  ]);
}

function handleScriptLoad(setCity, setGeo, autoCompleteRef) {
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
    handlePlaceSelect(setCity, setGeo)
  );
}

function SearchLocationInput({ city, setCity, setGeo, tailwindClasses }) {
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAyIRxk0Dyk7dSUsBh2IJZw28rT7AWBxjg&libraries=places`,
      () => handleScriptLoad(setCity, setGeo, autoCompleteRef)
    );
  }, []);

  return (
    <input
      className={`${tailwindClasses}`}
      type="text"
      ref={autoCompleteRef}
      onChange={(event) => {
        setCity(event.target.value);
        setGeo([]);
      }}
      placeholder="Ville"
      value={city}
    />
  );
}

export default SearchLocationInput;
