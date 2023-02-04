import { kmDistancesOptions } from "@assets/form-options/form-options";
import SearchLocationInput from "@components/frontandback/SearchLocationInput";
import { useEffect, useRef } from "react";
import { RiPinDistanceLine } from "react-icons/ri";

export default function OfferSearchLocationInput({
  city,
  setCity,
  setGeopoints,
  setDistance,
  setIsDistancesOpen,
  geopoints,
  isDistancesOpen,
  distance,
  autoCompleteRef,
  placeholder,
}) {
  const ref = useRef();

  const closeDistanceOnBlur = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDistancesOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDistanceOnBlur);
    return () => document.removeEventListener("mousedown", closeDistanceOnBlur);
  }, []);

  return (
    <div className="w-full">
      <SearchLocationInput
        city={city}
        setCity={setCity}
        setGeopoints={setGeopoints}
        tailwindClasses="w-full h-[50px]"
        autoCompleteRef={autoCompleteRef}
        placeholder={placeholder}
      />
      {geopoints.length > 0 && (
        <button
          ref={ref}
          type="button"
          className="absolute right-2 top-2  rounded p-1 flex items-center justify-center "
          onClick={() => setIsDistancesOpen(true)}
        >
          <div className="hover:text-blue-700">
            <RiPinDistanceLine size="1.8em" color="inherit" />
          </div>
          {isDistancesOpen && (
            <div className="absolute right-full top-1/2 sm:right-0 sm:top-full w-40 h-52 bg-white  border-gray-300 border-2 flex flex-col items-center justify-between z-10">
              {kmDistancesOptions.map((kmDistance) => {
                return (
                  <div
                    className={`flex items-center justify-center w-full h-full hover:bg-slate-400 ${
                      distance === kmDistance ? "bg-slate-300" : "bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="distances"
                      className="hidden"
                      id={kmDistance}
                      value={kmDistance}
                      checked={distance === kmDistance}
                      onChange={() => {
                        setIsDistancesOpen(false);
                        setDistance(kmDistance);
                      }}
                    />
                    <label
                      htmlFor={kmDistance}
                      className="text-sm font-medium text-gray-900 ml-2 block cursor-pointer"
                    >
                      {`À moins de ${kmDistance} km`}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </button>
      )}
    </div>
  );
}
