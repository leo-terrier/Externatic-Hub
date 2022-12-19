import EntrepriseLine from "@components/EntrepriseLine/EntrepriseLine";
import { getEntreprises } from "@services/utils";
import { useEffect, useState } from "react";

export default function AllEntreprises() {
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
            return (
              <EntrepriseLine key={entreprise.id} entreprise={entreprise} />
            );
          })}
      </ul>
    </>
  );
}
