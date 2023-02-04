import Boldify from "@components/frontandback/Boldify";
import { UserInfoContext } from "@components/frontandback/UserContext";
import Switch from "@mui/material/Switch";
import { toggleHasAlerts } from "@services/APIcall";
import { useContext, useState } from "react";

export default function Alerts() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const [hasAlerts, setHasAlerts] = useState(Boolean(userInfo.has_alerts));

  const handleToggleHasAlerts = () => {
    setHasAlerts(!hasAlerts);
    setUserInfo((prev) => ({ ...prev, has_alerts: !hasAlerts }));
    toggleHasAlerts(userInfo.id);
  };

  return (
    <div className="flex h-[42px] gap-4">
      <label className="flex items-center w-full" htmlFor="hasAlerts">
        <Boldify>
          Recevoir par email les offres correspondant à mes critères :{" "}
        </Boldify>
      </label>
      <div className="w-full flex h-full items-center justify-start">
        <Switch
          id="hasAlerts"
          checked={hasAlerts}
          onChange={handleToggleHasAlerts}
        />
      </div>
    </div>
  );
}
