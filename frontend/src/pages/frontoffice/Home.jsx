import { Link, Outlet } from "react-router-dom";

// import { MdAccountCircle, MdOutlineEmail } from "react-icons/md";

export default function Home() {
  return (
    <>
      <nav className="justify-end flex">
        <ul className="flex justify-evenly w-1/3">
          <li>
            <Link to="entreprises">Entreprises</Link>
          </li>
          <li>
            <Link to="/">Offre d'emploi</Link>
          </li>
          <li>
            <div className="flex justify-between w-16">
              {/* <Link>
                <MdOutlineEmail />
              </Link>
              <Link>
                <MdAccountCircle />
              </Link> */}
            </div>
          </li>
        </ul>
      </nav>
      <div className="p-12">
        <Outlet />
      </div>
    </>
  );
}
