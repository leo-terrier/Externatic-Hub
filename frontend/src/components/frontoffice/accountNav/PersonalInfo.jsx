import { UserInfoContext } from "@components/frontandback/UserContext";
import EditableParagraph from "@components/frontoffice/EditableParagraph";
import Switch from "@mui/material/Switch";
import { modifyUserInfo } from "@services/APIcall";
import { Boldify } from "@services/utils";
import { useContext, useState } from "react";
import FrontButton from "../../../pages/frontoffice/FrontButton";

export default function PersonalInfo() {
  const { userInfo } = useContext(UserInfoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [lastName, setLastname] = useState(userInfo.lastname);
  const [firstName, setFirstName] = useState(userInfo.firstname);
  const [email, setEmail] = useState(userInfo.email);
  const [telephone, setTelephone] = useState(userInfo.telephone);
  const [favContactMethod, setFavContactMethod] = useState(
    userInfo.favcontactmethod
  );
  const [city, setCity] = useState(userInfo.city);
  const [isActive, setIsActive] = useState(
    Boolean(parseInt(userInfo.is_active, 10))
  );

  const handleDoneEditing = () => {
    const obj = {
      lastName,
      firstName,
      email,
      telephone,
      favContactMethod,
      city,
      isActive,
      id: userInfo.id,
    };
    modifyUserInfo(obj);
  };

  const toggleIsEditing = () => {
    if (isEditing) {
      handleDoneEditing();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-between">
      <form className="flex flex-col gap-4 w-1/2">
        <EditableParagraph
          isEditing={isEditing}
          label="Nom"
          stateValue={lastName}
          stateSetter={setLastname}
        />
        <EditableParagraph
          isEditing={isEditing}
          label="Prénom"
          stateValue={firstName}
          stateSetter={setFirstName}
        />
        <EditableParagraph
          isEditing={isEditing}
          label="Email"
          stateValue={email}
          stateSetter={setEmail}
        />
        <EditableParagraph
          isEditing={isEditing}
          label="Téléphone"
          stateValue={telephone}
          stateSetter={setTelephone}
        />
        <EditableParagraph
          isEditing={isEditing}
          label="Ville"
          stateValue={city}
          stateSetter={setCity}
        />
        <div className="flex h-[42px] gap-4">
          <label className="flex items-center w-full" htmlFor="isActive">
            <Boldify>En recherche active</Boldify>
          </label>
          {isEditing ? (
            <div className="w-full flex h-full items-center justify-start">
              <Switch
                id="isActive"
                checked={isActive}
                onChange={() => {
                  setIsActive(!isActive);
                }}
              />
            </div>
          ) : (
            <p className="mb-0 w-full flex items-center">
              {isActive ? "Oui" : "Non"}
            </p>
          )}
        </div>
        <div className="flex h-[42px] gap-4">
          <label
            className="flex items-center w-full"
            htmlFor="Méthode de contact privilégiée"
          >
            <Boldify> Méthode de contact privilégiée</Boldify>
          </label>
          {isEditing ? (
            <select
              id="Méthode de contact privilégiée"
              value={favContactMethod}
              onChange={(e) => setFavContactMethod(e.target.value)}
              className="min-w-[192px]"
            >
              <option value="email">email</option>
              <option value="telephone">telephone</option>
            </select>
          ) : (
            <p className="mb-0 w-full flex items-center">{favContactMethod}</p>
          )}
        </div>
      </form>
      <div className="w-2/12 self-end flex justify-center">
        <FrontButton
          content={isEditing ? "SAUVEGARDER" : "EDITER"}
          type="button"
          onClick={toggleIsEditing}
          isPrimary={isEditing}
        />
      </div>
    </div>
  );
}
