import IconButton from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { MdAccountCircle, MdOutlineEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";
import logoExternatic from "../../assets/LogoExternatic.png";

export default function Home() {
  const { pathname } = useLocation();

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
    <>
      <nav className="flex pt-4 px-4">
        <Link to="/">
          <div className="flex w-[280px] h-[50px] gap-2 lg:w-[380px] lg:gap-4">
            <div className="h-12">
              <img
                src={logoExternatic}
                className="max-h-full"
                alt="logo-externatic"
              />
            </div>
            <p className="self-start text-2xl  mb-0 text-rose-700 font-extrabold italic lg:text-3xl">
              HUB
            </p>
          </div>
        </Link>
        <div className="flex justify-end w-full md:hidden ">
          <IconButton onClick={handleOpenBurger}>
            <RxHamburgerMenu size="2em" color="black" />
          </IconButton>
          <Menu
            href=""
            anchorEl={anchorEl}
            open={isBurgerMenuOpen}
            onClose={handleCloseBurger}
          >
            <MenuItem onClick={handleCloseBurger}>
              <Link to="/">Offres d'emploi</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseBurger}>
              {" "}
              <Link to="entreprise">Entreprises</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseBurger}>
              <Link to="/">Messagerie</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseBurger}>
              <Link to="/">Mon Compte</Link>
            </MenuItem>
          </Menu>
        </div>
        <ul className="hidden md:flex w-full items-center justify-end text-xl gap-4 lg:text-2xl lg:gap-8">
          <li
            className={`font-bold hover:text-blue-700 ${
              !["entreprise", "mon-compte", "message"].some((elt) =>
                pathname.includes(elt)
              )
                ? "text-blue-700"
                : ""
            }`}
          >
            <Link to="/">Offres d'emploi</Link>
          </li>
          <li
            className={`font-bold hover:text-blue-700 ${
              pathname.includes("entreprise") ? "text-blue-700" : ""
            }`}
          >
            <Link to="entreprise">Entreprises</Link>
          </li>

          <li>
            <div className="flex justify-between gap-4 lg:gap-8">
              <Link
                className={`hover:text-blue-700 ${
                  pathname.includes("message") ? "text-blue-700" : ""
                }`}
              >
                <MdOutlineEmail size="2em" />
              </Link>
              <Link
                className={`hover:text-blue-700 ${
                  pathname.includes("mon-compte") ? "text-blue-700" : ""
                }`}
              >
                <MdAccountCircle size="2em" />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div className="mt-12 pb-12 w-10/12 max-w-[1200px] mx-auto sm:mt-16 sm:pb-16 md:mt-20 md:pb-20">
        <Outlet />
      </div>
    </>
  );
}
