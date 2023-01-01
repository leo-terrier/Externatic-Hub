import { Link } from "react-router-dom";
import React from "react";

export default function UserCard({ user }) {
  return (
    <li>
      <div style={{ border: "1px solid" }}>
        <h3>
          <Link to={user.id.toString()}>{user.title}</Link>
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <p>id {user.id}</p>
          <p>firstname {user.firstname}</p>
          <p>lastname {user.lastname}</p>
          <p>email {user.email}</p>
          <p>tel {user.tel}</p>
          <p>city {user.city}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <p>nb_sent_propositions : {user.nb_sent_propositions}</p>
          <p> nb_received_propositions{user.nb_received_propositions}</p>
          <p> offres pourvues {user.nb_sent_propositions}</p>
        </div>
      </div>
    </li>
  );
}
