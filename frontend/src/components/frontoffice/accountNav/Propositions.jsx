import { UserInfoContext } from "@components/frontandback/UserContext";
import { getUserPropositions } from "@services/APIcall";
import { useContext, useEffect, useState } from "react";

import PropositionCard from "./PropositionCard";

export default function Propositions() {
  const { userInfo } = useContext(UserInfoContext);
  const [propositions, setPropositions] = useState([]);

  useEffect(() => {
    getUserPropositions(userInfo.id).then(function (res) {
      setPropositions(
        res.filter((elt) => elt.proposition_initative === "entreprise")
      );
    });
  }, []);

  if (propositions.length) {
    return (
      <ul className="space-y-8">
        {propositions.map((proposition) => (
          <PropositionCard proposition={proposition} />
        ))}
      </ul>
    );
  }
  return <p>vide</p>;
}
