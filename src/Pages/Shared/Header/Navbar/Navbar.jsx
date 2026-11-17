import { useContext, useEffect, useRef, useState } from "react";
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
  FiUserCheck,
  FiSettings,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logOut();

      setProfileOpen(false);
      setMobileMenuOpen(false);

      Toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);

      Toast.error?.("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  // Close all menus
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  // Navigation Link Styling
  const navLinkClass = ({ isActive }) =>
    `group relative inline-flex items-center gap-2 py-2.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300
    ${isActive ? "text-[#D4A853]" : "text-white/75 hover:text-[#E5BE79]"}
    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-[#D4A853] after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}`;

  // Mobile Navigation Link Styling
  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300
    ${
      isActive
        ? "bg-[#D4A853]/10 text-[#D4A853]"
        : "text-white/75 hover:bg-white/[0.05] hover:text-[#E5BE79]"
    }`;

  // Account menu item
  const accountLinkClass =
    "group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium text-white/75 transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#E5BE79]";

  // User information
  const userName = user?.displayName || "Food Lover";
  const userEmail = user?.email || "";
  const userPhoto = user?.photoURL;

  // User Avatar
  const UserAvatar = ({ size = "h-10 w-10", iconSize = "text-2xl" }) => {
    return (
      <div
        className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4A853]/40 bg-[#D4A853]/10`}
      >
        {userPhoto ? (
          <img
            src={userPhoto}
            alt={userName}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <TbUserCircle className={`${iconSize} text-[#D4A853]`} />
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4A853]/20 bg-[#10392C]/95 text-white shadow-[0_8px_35px_rgba(0,0,0,0.20)] backdrop-blur-2xl">
      {/* Main Navigation */}
      <nav className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:min-h-[86px] lg:px-10 xl:px-14">
        {/* Logo */}
        <div onClick={closeMenu} className="flex shrink-0 items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 xl:gap-10 lg:flex">
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
        <div className="hidden items-center gap-3 lg:flex">
          {/* User Login / Information */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex max-w-[190px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:border-[#D4A853]/40">
                <UserAvatar size="h-9 w-9" iconSize="text-xl" />

                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-white">
                    {userName}
                  </p>

                  <p className="text-[10px] tracking-wide text-white/45">
                    Welcome back
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="group inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#D4A853]/50 px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#E5BE79] transition-all duration-300 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#10392C] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiLogOut className="transition-transform duration-300 group-hover:-translate-x-1" />

                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8C47F] px-6 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#10392C] shadow-[0_5px_20px_rgba(212,168,83,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,168,83,0.32)]"
            >
              <FiUser className="text-base transition-transform group-hover:scale-110" />
              Login
            </Link>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="Open account menu"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                profileOpen
                  ? "rotate-0 border-[#D4A853] bg-[#D4A853] text-[#10392C] shadow-[0_0_20px_rgba(212,168,83,0.25)]"
                  : "border-[#D4A853]/40 bg-white/[0.04] text-[#D4A853] hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#10392C]"
              }`}
            >
              <TbUserCircle className="text-[27px]" />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-[58px] z-[60] w-[290px] origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden rounded-2xl border border-[#D4A853]/25 bg-[#123B2E] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                {/* Dropdown Header */}
                <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#D4A853]/15 to-transparent px-5 py-5">
                  <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#D4A853]/10 blur-2xl" />

                  <div className="relative flex items-center gap-3">
                    <UserAvatar size="h-12 w-12" iconSize="text-3xl" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">
                        {user ? userName : "Welcome, Food Lover"}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-white/50">
                        {userEmail || "Discover delicious experiences"}
                      </p>
                    </div>
                  </div>

                  {user && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4A853]">
                      <FiUserCheck />
                      Account Active
                    </div>
                  )}
                </div>

                {/* Account Links */}
                <div className="space-y-1 p-3">
                  {user && (
                    <Link
                      to="/userProfile"
                      onClick={closeMenu}
                      className={accountLinkClass}
                    >
                      <FiUser className="text-lg text-[#D4A853]" />
                      My Profile
                    </Link>
                  )}

                  <Link
                    to="/myAddedFood"
                    onClick={closeMenu}
                    className={accountLinkClass}
                  >
                    <FiCoffee className="text-lg text-[#D4A853]" />
                    My Added Food Items
                  </Link>

                  <Link
                    to="/addfood"
                    onClick={closeMenu}
                    className={accountLinkClass}
                  >
                    <FiPlus className="text-lg text-[#D4A853]" />
                    Add a Food Item
                  </Link>

                  <Link
                    to="/myOrder"
                    onClick={closeMenu}
                    className={accountLinkClass}
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
                      disabled={loggingOut}
                      className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/[0.07] px-4 py-3 text-[12px] font-bold text-red-300 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                      <FiLogOut />
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#E8C47F] px-4 py-3 text-[12px] font-bold text-[#10392C] transition-all duration-300 hover:shadow-lg"
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
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4A853]/40 bg-[#D4A853]/10 text-[#E5BE79] transition-all duration-300 hover:bg-[#D4A853] hover:text-[#10392C] lg:hidden"
        >
          {mobileMenuOpen ? (
            <FiX className="text-[23px]" />
          ) : (
            <FiMenu className="text-[23px]" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        ref={mobileRef}
        className={`overflow-hidden border-t border-[#D4A853]/15 bg-[#10392C] transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "max-h-[850px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              <span>Home</span>
              <FiChevronDown className="rotate-[-90deg] text-sm opacity-40" />
            </NavLink>

            <NavLink
              to="/allFood"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              <span>All Food Items</span>
              <FiChevronDown className="rotate-[-90deg] text-sm opacity-40" />
            </NavLink>

            <NavLink
              to="/blog"
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              <span>Blog</span>
              <FiChevronDown className="rotate-[-90deg] text-sm opacity-40" />
            </NavLink>
          </div>

          {/* Mobile Account Section */}
          <div className="border-t border-white/10 pt-5">
            {/* User Information */}
            {user && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#D4A853]/20 bg-white/[0.04] p-4">
                <UserAvatar size="h-12 w-12" iconSize="text-3xl" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {userName}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-white/50">
                    {userEmail}
                  </p>
                </div>

                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              </div>
            )}

            {/* Mobile Account Links */}
            <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4A853]/75">
              {user ? "My Account" : "Explore Your Account"}
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {user && (
                <Link
                  to="/userProfile"
                  onClick={closeMenu}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[13px] font-medium text-white/80 transition-all hover:border-[#D4A853]/40 hover:text-[#E5BE79]"
                >
                  <FiUser className="text-[#D4A853]" />
                  My Profile
                </Link>
              )}

              <Link
                to="/myAddedFood"
                onClick={closeMenu}
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[13px] font-medium text-white/80 transition-all hover:border-[#D4A853]/40 hover:text-[#E5BE79]"
              >
                <FiCoffee className="text-[#D4A853]" />
                My Added Food
              </Link>

              <Link
                to="/addfood"
                onClick={closeMenu}
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[13px] font-medium text-white/80 transition-all hover:border-[#D4A853]/40 hover:text-[#E5BE79]"
              >
                <FiPlus className="text-[#D4A853]" />
                Add Food Item
              </Link>

              <Link
                to="/myOrder"
                onClick={closeMenu}
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[13px] font-medium text-white/80 transition-all hover:border-[#D4A853]/40 hover:text-[#E5BE79]"
              >
                <FiShoppingBag className="text-[#D4A853]" />
                My Orders
              </Link>
            </div>

            {/* Mobile Login / Logout */}
            <div className="mt-5">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/[0.07] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-red-300 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                >
                  <FiLogOut />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#E8C47F] px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#10392C] shadow-lg transition-all duration-300 hover:shadow-[0_5px_25px_rgba(212,168,83,0.25)]"
                >
                  <FiUser />
                  Login to Your Account
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-[10px] tracking-[0.08em] text-white/35">
              © {new Date().getFullYear()} Abrar's Dine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
