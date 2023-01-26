import { UserInfoContext } from "@components/frontandback/UserContext";
import { loginUser } from "@services/APIcall";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontButton from "./FrontButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserInfoContext);

  const handleSubmit = async () => {
    const user = await loginUser(email, password);
    if (user) {
      setUserInfo(user);
      navigate("../");
    } else {
      // setIsWrongCredentials(true);
    }
  };

  return (
    <form className="w-1/2 max-w-[500px] mx-auto">
      <h1 className="mb-4">S'identifier</h1>
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
      <div className="flex flex-col items-center justify-center my-3">
        <FrontButton
          onClick={handleSubmit}
          isPrimary
          content="Valider"
          tailwindClass="w-full mt-4"
        />
        <div className="flex justify-center border-b border-gray-400 w-full my-4">
          <p className="text-xs text-gray-500 ">
            Mot de passe oublié ?{" "}
            <a href="#" className="font-bold text-gray-700">
              Clickez ici
            </a>
          </p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <FrontButton
            isPrimary={false}
            onClick={() => navigate("../register")}
            content="Créer un compte"
            tailwindClass=" w-full "
          />
          <p className="font-extrabold mb-0">OU</p>
          <FrontButton
            isPrimary={false}
            onClick={() => navigate("/")}
            content="Linkedin"
            tailwindClass=" w-full "
          />
        </div>
      </div>
    </form>
  );
}
