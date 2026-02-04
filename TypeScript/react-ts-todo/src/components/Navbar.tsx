import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">React TS App</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/todo" className="hover:underline">
          Todo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
