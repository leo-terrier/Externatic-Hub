import { NavLink, Outlet } from "react-router-dom";

export default function BackHome() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="entreprise">entreprises</NavLink>
          </li>
          <li>
            <NavLink to="candidat">candidats</NavLink>
          </li>
          <li>
            <NavLink to="offre">offres</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
