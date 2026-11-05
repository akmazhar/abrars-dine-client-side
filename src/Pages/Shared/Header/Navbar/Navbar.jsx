import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Toast from "./../../../Toast/Toast";
import Logo from "../Logo/Logo";

import { TbUserCircle } from "react-icons/tb";

import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiPlus,
  FiShoppingBag,
  FiCoffee,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Logout Handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        setProfileOpen(false);
        setMobileMenuOpen(false);
        Toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  // Navigation Link Design
  const navLinkClass = ({ isActive }) =>
    `relative inline-flex items-center py-2 text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-300
    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#D4A853] after:transition-all after:duration-300
    ${
      isActive
        ? "text-[#D4A853] after:w-full"
        : "text-white/75 hover:text-[#D4A853] after:w-0 hover:after:w-full"
    }`;

  // Close mobile menu after navigation
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4A853]/20 bg-[#10100F]/95 text-white shadow-[0_5px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      {/* Top Navigation */}
      <nav className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        {/* Logo */}
        <div onClick={closeMenu} className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/allFood" className={navLinkClass}>
            All Food Items
          </NavLink>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Login / User Information */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#D4A853]/20 bg-white/[0.04] px-3 py-2">
                <TbUserCircle className="h-6 w-6 text-[#D4A853]" />

                <span className="max-w-[150px] truncate text-xs font-medium text-white/80">
                  {user.displayName || user.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="group flex items-center gap-2 rounded-full border border-[#D4A853]/60 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#D4A853] transition-all duration-300 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#10100F] hover:shadow-[0_5px_20px_rgba(212,168,83,0.25)]"
              >
                <FiLogOut className="transition-transform duration-300 group-hover:-translate-x-1" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4A853] to-[#B88935] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#17130C] shadow-[0_5px_20px_rgba(212,168,83,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,168,83,0.35)]"
            >
              <FiUser />
              Login
            </Link>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                profileOpen
                  ? "border-[#D4A853] bg-[#D4A853] text-[#10100F]"
                  : "border-[#D4A853]/40 bg-white/5 text-[#D4A853] hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#10100F]"
              }`}
            >
              <TbUserCircle className="h-7 w-7" />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-[58px] z-50 w-72 overflow-hidden rounded-2xl border border-[#D4A853]/30 bg-[#171714] shadow-[0_15px_50px_rgba(0,0,0,0.55)] animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Dropdown Header */}
                <div className="border-b border-white/10 bg-gradient-to-r from-[#D4A853]/15 to-transparent px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4A853]/40 bg-[#D4A853]/10">
                      <TbUserCircle className="h-7 w-7 text-[#D4A853]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        My Account
                      </p>

                      <p className="truncate text-xs text-white/50">
                        {user?.email || "Welcome to Abrar's Dine"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Links */}
                <div className="space-y-1 p-3">
                  <Link
                    to="/myAddedFood"
                    onClick={closeMenu}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#D4A853]"
                  >
                    <FiCoffee className="text-lg text-[#D4A853]" />
                    My Added Food Items
                  </Link>

                  <Link
                    to="/addfood"
                    onClick={closeMenu}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#D4A853]"
                  >
                    <FiPlus className="text-lg text-[#D4A853]" />
                    Add a Food Item
                  </Link>

                  <Link
                    to="/myOrder"
                    onClick={closeMenu}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#D4A853]"
                  >
                    <FiShoppingBag className="text-lg text-[#D4A853]" />
                    My Ordered Food Items
                  </Link>
                </div>

                {/* Dropdown Footer */}
                <div className="border-t border-white/10 p-3">
                  {user ? (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4A853] px-4 py-3 text-sm font-bold text-[#10100F] transition-all duration-300 hover:bg-[#E7BD70]"
                    >
                      <FiUser />
                      Login to Your Account
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A853]/40 bg-[#D4A853]/10 text-[#D4A853] transition-all duration-300 hover:bg-[#D4A853] hover:text-[#10100F] lg:hidden"
        >
          {mobileMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#D4A853]/15 bg-[#151512] transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? "max-h-[750px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-5 px-6 py-6 sm:px-10">
          {/* Mobile Links */}
          <div className="flex flex-col gap-2">
            <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/allFood" onClick={closeMenu} className={navLinkClass}>
              All Food Items
            </NavLink>

            <NavLink to="/blog" onClick={closeMenu} className={navLinkClass}>
              Blog
            </NavLink>
          </div>

          {/* Mobile Account Information */}
          <div className="border-t border-white/10 pt-5">
            {user && (
              <div className="mb-5 flex items-center gap-3">
                <TbUserCircle className="h-9 w-9 text-[#D4A853]" />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">My Account</p>

                  <p className="truncate text-xs text-white/50">{user.email}</p>
                </div>
              </div>
            )}

            {/* Mobile Account Links */}
            <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Link
                to="/myAddedFood"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all hover:border-[#D4A853]/50 hover:text-[#D4A853]"
              >
                <FiCoffee className="text-[#D4A853]" />
                My Added Food
              </Link>

              <Link
                to="/addfood"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all hover:border-[#D4A853]/50 hover:text-[#D4A853]"
              >
                <FiPlus className="text-[#D4A853]" />
                Add Food Item
              </Link>

              <Link
                to="/myOrder"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-all hover:border-[#D4A853]/50 hover:text-[#D4A853]"
              >
                <FiShoppingBag className="text-[#D4A853]" />
                My Orders
              </Link>
            </div>

            {/* Mobile Login / Logout */}
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                <FiLogOut />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4A853] to-[#B88935] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#17130C] shadow-lg transition-all duration-300 hover:shadow-[0_5px_25px_rgba(212,168,83,0.3)]"
              >
                <FiUser />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
