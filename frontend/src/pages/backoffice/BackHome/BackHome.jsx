import { Outlet, NavLink } from "react-router-dom";

export default function BackHome() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="entreprises">entreprises</NavLink>
          </li>
          <li>
            <NavLink to="candidates">candidats</NavLink>
          </li>
          <li>
            <NavLink to="offers">offres</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
