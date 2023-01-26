import googleApiKey from "@assets/googleApiKeySecret";
import { retreiveSessionInfo } from "@services/APIcall";
import { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext();

export default function UserContext({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  const getSessionInfo = async () => {
    try {
      const sessionInfo = await retreiveSessionInfo();
      setUserInfo(sessionInfo);
    } catch (e) {
      setUserInfo({});
    }
  };

  let googleScript;
  let googleElt;

  const loadGmap = () => {
    googleElt = document.getElementById("gmap-script");
    if (!googleElt) {
      googleScript = document.createElement("script");
      googleScript.type = "text/javascript";
      googleScript.id = "gmap-script";
      if (googleScript.readyState) {
        googleScript.onreadystatechange = function () {
          if (
            googleScript.readyState === "loaded" ||
            googleScript.readyState === "complete"
          ) {
            googleScript.onreadystatechange = null;
            setGoogleScriptLoaded(true);
          }
        };
      } else {
        googleScript.onload = () => setGoogleScriptLoaded(true);
      }
      googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      document.getElementsByTagName("head")[0].appendChild(googleScript);
    } else {
      setGoogleScriptLoaded(true);
    }
  };

  useEffect(() => {
    loadGmap();
    getSessionInfo();
  }, []);

  const store = { userInfo, setUserInfo, googleScript };

  if (userInfo && googleScriptLoaded) {
    return (
      <UserInfoContext.Provider value={store}>
        {children}
      </UserInfoContext.Provider>
    );
  }
}
