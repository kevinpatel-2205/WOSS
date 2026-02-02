import { Link, NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="w-full bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold">
          <Link to="/">Leave Management System</Link>
        </h1>

        <nav className="flex items-center gap-4 text-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-white"
                : "opacity-80 hover:opacity-100"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/leave"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-white"
                : "opacity-80 hover:opacity-100"
            }
          >
            Leave
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-white"
                : "opacity-80 hover:opacity-100"
            }
          >
            User
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
