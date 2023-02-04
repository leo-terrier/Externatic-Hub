import { UserInfoContext } from "@components/frontandback/UserContext";
import { loginUser, registerUser } from "@services/APIcall";
import { fillInfoNotification } from "@services/notificationStore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontButton from "./FrontButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserInfoContext);

  const handleSubmit = async () => {
    if (password === passwordConfirm) {
      const createdUser = await registerUser(email, password);
      if (createdUser) {
        const user = await loginUser(email, password);
        console.log(user);
        setUserInfo(user);
        navigate("../account");
        fillInfoNotification();
      } else {
        // setIsWrongCredentials(true);
      }
    }
  };

  return (
    <form className="w-1/2 max-w-[500px] mx-auto">
      <h1 className="mb-4">S'enregistrer</h1>
      <div className="flex flex-col my-2">
        <label htmlFor="email" className="text-xs font-bold">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-1 mt-2"
          type="text"
          id="email"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="password" className="text-xs font-bold">
          Mot de passe
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-1 mt-2"
          type="password"
          id="password"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="passwordConfirm" className="text-xs font-bold">
          Confirmez de passe
        </label>
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="border rounded px-3 py-1 mt-2"
          type="password"
          id="passwordConfirm"
        />
      </div>
      <div className="flex flex-col items-center justify-center my-3">
        <FrontButton
          onClick={handleSubmit}
          content="Créer un compte"
          tailwindClass="w-full mt-4"
        />
      </div>
    </form>
  );
}
