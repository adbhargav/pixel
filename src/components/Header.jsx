import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between z-50 shadow">
      <Link to="/" className="text-2xl font-bold tracking-wide text-white">
        Pixe Fablo
      </Link>
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:underline text-white">Home</Link>
        <Link to="/presets" className="hover:underline text-white">Presets</Link>
        <Link to="/grading/default/submit" className="hover:underline text-white">Grading</Link>
        <Link to="/cart" className="relative flex items-center hover:underline text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13a1 1 0 001-1V7a1 1 0 00-1-1H6.4M7 13H5.4M16 16a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Cart
        </Link>
      </div>
    </nav>
  );
}
