import { makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";

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

  // Buger Menu States
  const [anchorEl, setAnchorEl] = useState(null);
  const handleCloseBurger = () => {
    setAnchorEl(null);
  };
  const handleOpenBurger = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isBurgerMenuOpen = Boolean(anchorEl);

  return (
    <div className="min-h-screen bg-slate-200 md:bg-white ">
      <nav className="hidden h-full md:flex fixed my-auto flex items-center text-center bg-slate-200 border-r-4 border-slate-800 z-10">
        <ul className="w-44 text-2xl flex flex-col h-44 justify-between">
          <li
            className={pathname.includes("entreprise") ? "font-extrabold" : ""}
          >
            <Link to="entreprise">Entreprises</Link>
          </li>
          <li className={pathname.includes("user") ? "font-extrabold" : ""}>
            <Link to="user">Candidats</Link>
          </li>
          <li className={pathname.includes("offre") ? "font-extrabold" : ""}>
            <Link to="offre">Offres</Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-end w-full md:hidden pt-4 pr-4">
        <IconButton onClick={handleOpenBurger}>
          <RxHamburgerMenu size="2em" color="black" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isBurgerMenuOpen}
          onClose={handleCloseBurger}
        >
          <MenuItem onClick={handleCloseBurger}>
            {" "}
            <Link to="entreprise">Entreprises</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseBurger}>
            <Link to="user">Candidats</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseBurger}>
            <Link to="offre">Offres</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseBurger}>
            <Link to="/">Mon Compte</Link>
          </MenuItem>
        </Menu>
      </div>
      <div className={`pt-12 pb-12 ${classes.table} md-bg-white md:ml-44`}>
        <div className="w-11/12 mx-auto max-w-[1200px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
