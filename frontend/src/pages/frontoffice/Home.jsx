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

  // Auth

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
      <nav className="flex h-[80px] px-4 items-center">
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
        <ul className="ml-4 hidden md:flex w-10/12  justify-start text-lg  lg:text-xl lg:gap-8">
          <li className={`font-bold hover:text-rose-600 `}>
            <Link to="/">Offres d'emploi</Link>
          </li>
          <li className={`font-bold hover:text-rose-600 `}>
            <Link to="entreprise">Entreprises</Link>
          </li>
          <li className={`font-bold hover:text-rose-600 `}>
            <Link to="entreprise">Accès backoffice</Link>
          </li>
        </ul>
        <ul className="hidden md:flex w-2/12 items-center justify-end text-xl gap-4 lg:text-2xl lg:gap-8">
          <li>
            <div className="flex justify-between gap-4 lg:gap-8">
              <Link className="hover:text-rose-600">
                <MdOutlineEmail size="2em" />
              </Link>
              <Link to="account" className={`hover:text-rose-600 `}>
                <MdAccountCircle size="2em" />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div
        className={`w-full  border-t-2 ${
          pathname.includes("account") ? "bg-white" : "bg-slate-200"
        } border-zinc-600`}
      >
        <div
          className={`py-20 w-10/12 max-w-[1200px] px-20 box-content mx-auto  sm:pb-16  md:pb-20 ${
            !pathname.includes("account")
              ? "bg-white shadow-xl"
              : "bg-slate-200 shadow-2xl"
          }  min-h-screen`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
