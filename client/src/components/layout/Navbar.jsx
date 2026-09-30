import {
  Bell,
  MapPin,
  LayoutDashboard,
  Map,
  PlusCircle,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";
import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fullName = user.fullName || "Guest";
  const role = user.role || "Citizen";

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <motion.nav
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}

        <div
          onClick={() => navigate("/dashboard")}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <MapPin className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-2xl font-extrabold">
            <span className="text-gray-900">Nagar</span>
            <span className="text-blue-600">Connect</span>
          </h1>
        </div>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-3">

          <NavLink
            to="/dashboard"
            className={navClass}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/map"
            className={navClass}
          >
            <Map size={18} />
            Map
          </NavLink>

          <NavLink
            to="/report"
            className={navClass}
          >
            <PlusCircle size={18} />
            Report Issue
          </NavLink>

          {role === "ADMIN" && (
            <NavLink
              to="/admin"
              className={navClass}
            >
              <ShieldCheck size={18} />
              Admin
            </NavLink>
          )}

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate("/notifications")}
            className={`relative rounded-xl p-2 transition ${
              location.pathname === "/notifications"
                ? "bg-blue-100"
                : ""
            }`}
          >
            <Bell className="h-6 w-6 text-gray-700" />

            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          </motion.button>

          <div className="hidden md:flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg">
              {initials}
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {fullName}
              </p>

              <p className="text-sm text-gray-500">
                {role}
              </p>
            </div>

          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </motion.button>

        </div>

      </div>
    </motion.nav>
  );
}