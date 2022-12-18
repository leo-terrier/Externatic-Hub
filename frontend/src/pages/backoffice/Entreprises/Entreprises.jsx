import EntrepriseLine from "@components/entrepriseline/EntrepriseLine";
import { getEntreprises } from "@services/utils";
import { useEffect, useState } from "react";

export default function Entreprises() {
  const [entreprises, setEntreprises] = useState([]);

  useEffect(() => {
    getEntreprises().then((res) => setEntreprises(res));
  }, []);

  return (
    <>
      <h1>Entreprise</h1>
      <ul>
        {entreprises.length > 0 &&
          entreprises.map((entreprise) => {
            return <EntrepriseLine entreprise={entreprise} />;
          })}
      </ul>
    </>
  );
}
