import { Boldify } from "@services/utils";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <li>
      <Link to={user.id.toString()} className="relative">
        <h2 className="text-xl mb-0">
          {user.user_name} (id : {user.id})
        </h2>
        <p className="mb-0"> {user.city}</p>
        <div className="flex flex-col items-start my-3">
          <p>
            <Boldify>Email</Boldify> : {user.email}
          </p>
          <p>
            <Boldify>Tel</Boldify> : {user.telephone}
          </p>
        </div>
        <ul className="flex flex-col content-center list-disc text-zinc-900 list-inside	">
          <li>{user.nb_sent_propositions} candidature(s) réalisée(s)</li>
          <li>{user.nb_received_propositions} proposition(s) reçue(s)</li>
          <li>{user.nb_filled_offers} offre(s) pourvue(s)</li>
        </ul>
        <p
          className={`absolute bottom-[-22px] right-[-12px] font-bold text-${
            user.status === "Actif" ? "green" : "red"
          }-500`}
        >
          {user.status}
        </p>
      </Link>
    </li>
  );
}
