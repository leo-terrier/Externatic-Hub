import { makeStyles } from "@material-ui/core";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  table: {
    "& tbody>.MuiTableRow-root:hover": {
      background: "rgb(203 213 225)",
    },
  },
}));

export default function BackHome() {
  const { pathname } = useLocation();

  const classes = useStyles();

  return (
    <div className="h-full">
      <nav className="h-full fixed my-auto flex items-center text-center bg-slate-200 border-r-4 border-slate-800">
        <ul className=" w-44 shrink-0 text-2xl flex flex-col h-44 justify-between">
          <li
            className={pathname.includes("entreprise") ? "font-extrabold	" : ""}
          >
            <NavLink to="entreprise">Entreprises</NavLink>
          </li>
          <li className={pathname.includes("candidat") ? "font-extrabold	" : ""}>
            <NavLink to="candidat">Candidats</NavLink>
          </li>
          <li className={pathname.includes("offre") ? "font-extrabold	" : ""}>
            <NavLink to="offre">Offres</NavLink>
          </li>
        </ul>
      </nav>
      <div className={`ml-44 p-16 bg-slate-100 ${classes.table}`}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
