import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import {
  FiUser,
  FiMail,
  FiCamera,
  FiEdit3,
  FiSave,
  FiX,
  FiShield,
  FiCalendar,
  FiClock,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user, loading } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoError, setPhotoError] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  // Sync Firebase User Information
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
      setPhotoError(false);
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const displayName = formData.displayName.trim();
    const photoURL = formData.photoURL.trim();

    if (!displayName) {
      setError("Please enter your full name.");
      return;
    }

    if (displayName.length > 80) {
      setError("Your name cannot exceed 80 characters.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateProfile(user, {
        displayName,
        photoURL: photoURL || null,
      });

      // Refresh local Firebase user data
      await user.reload();

      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });

      setPhotoError(false);
      setIsEditing(false);

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been updated successfully.",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#174C3A",
      });
    } catch (err) {
      console.error("Profile Update Error:", err);

      setError(
        err.code === "auth/network-request-failed"
          ? "Network error. Please check your internet connection."
          : "Unable to update your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Cancel Editing
  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });

    setError("");
    setPhotoError(false);
    setIsEditing(false);
  };

  // Format Firebase Dates
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Initials for Avatar Fallback
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  // Authentication Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#174C3A]" />
          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // No Authenticated User
  if (!user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F5F1E8] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#174C3A]/10 text-3xl text-[#174C3A]">
            <FiUser />
          </div>

          <h2 className="mt-6 text-2xl font-extrabold text-[#174C3A]">
            Login Required
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            Please sign in to view and manage your profile information.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3A] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#10392C]"
          >
            Sign In
            <FiArrowLeft className="rotate-180" />
          </Link>
        </div>
      </section>
    );
  }

  const userName = user.displayName || "Valued Customer";
  const userEmail = user.email || "Email not available";
  const profileImage = user.photoURL;

  const providerNames = (user.providerData || [])
    .map((provider) => {
      if (provider.providerId === "google.com") return "Google";
      if (provider.providerId === "password") return "Email & Password";
      return provider.providerId;
    })
    .filter(Boolean);

  const accountType = providerNames.length
    ? [...new Set(providerNames)].join(", ")
    : "Firebase Account";

  const accountCreated = user.metadata?.creationTime;
  const lastSignIn = user.metadata?.lastSignInTime;

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#B58A42]">
              My Account
            </span>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#174C3A] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Manage your personal information and account details.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#174C3A]/15 bg-white px-5 py-3 text-sm font-semibold text-[#174C3A] transition hover:border-[#174C3A] hover:bg-[#174C3A] hover:text-white"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_15px_60px_rgba(16,57,44,0.09)]">
          {/* Profile Banner */}
          <div className="relative overflow-hidden bg-[#174C3A] px-6 py-10 sm:px-10 sm:py-12">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-5 -top-14 h-44 w-44 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/[0.04]" />

            <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                {profileImage && !photoError ? (
                  <img
                    src={profileImage}
                    alt={userName}
                    onError={() => setPhotoError(true)}
                    className="h-28 w-28 rounded-full border-4 border-[#D8B66D] bg-white object-cover shadow-xl sm:h-32 sm:w-32"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D8B66D] bg-[#F5F1E8] text-3xl font-extrabold text-[#174C3A] shadow-xl sm:h-32 sm:w-32 sm:text-4xl">
                    {getInitials(userName)}
                  </div>
                )}

                <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#174C3A] bg-[#D8B66D] text-[#174C3A]">
                  <FiCheckCircle className="text-sm" />
                </span>
              </div>

              {/* User Details */}
              <div className="text-center sm:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] text-[#E8D5AF]">
                  <FiShield />
                  Registered Member
                </span>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {userName}
                </h2>

                <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/75 sm:justify-start sm:text-base">
                  <FiMail className="shrink-0 text-[#D8B66D]" />
                  <span className="break-all">{userEmail}</span>
                </p>

                <p className="mt-3 text-xs font-medium text-[#D8B66D]">
                  Welcome to Abrar's Dine
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:p-10">
            {/* Personal Information */}
            <div>
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#174C3A] sm:text-2xl">
                    Personal Information
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Your personal account details
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setIsEditing(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#174C3A]/10 px-4 py-2.5 text-sm font-bold text-[#174C3A] transition hover:bg-[#174C3A] hover:text-white"
                  >
                    <FiEdit3 />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                      <input
                        id="profile-name"
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        maxLength={80}
                        required
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#174C3A] focus:ring-4 focus:ring-[#174C3A]/10"
                      />
                    </div>
                  </div>

                  {/* Photo URL Input */}
                  <div>
                    <label
                      htmlFor="profile-photo"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Profile Photo URL
                    </label>

                    <div className="relative">
                      <FiCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                      <input
                        id="profile-photo"
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#174C3A] focus:ring-4 focus:ring-[#174C3A]/10"
                      />
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Enter a publicly accessible image URL.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                    >
                      <FiAlertCircle className="mt-0.5 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#10392C] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        <FiSave />
                      )}

                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-60"
                    >
                      <FiX />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#FAFAF8] p-4 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#174C3A]/10 text-xl text-[#174C3A]">
                      <FiUser />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Full Name
                      </p>

                      <p className="mt-1 break-words text-sm font-bold text-gray-800 sm:text-base">
                        {userName}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#FAFAF8] p-4 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#174C3A]/10 text-xl text-[#174C3A]">
                      <FiMail />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 break-all text-sm font-bold text-gray-800 sm:text-base">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  {/* Authentication Provider */}
                  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#FAFAF8] p-4 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#174C3A]/10 text-xl text-[#174C3A]">
                      <FiShield />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Sign-in Method
                      </p>

                      <p className="mt-1 break-words text-sm font-bold text-gray-800 sm:text-base">
                        {accountType}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Information */}
            <aside>
              <div className="rounded-3xl border border-[#174C3A]/10 bg-[#FAFAF8] p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#174C3A] text-xl text-white">
                    <FiShield />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-[#174C3A]">
                      Account Overview
                    </h3>

                    <p className="text-xs text-gray-400">
                      Your account activity
                    </p>
                  </div>
                </div>

                <div className="my-6 h-px bg-gray-200" />

                {/* Account Status */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-500">Account Status</span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    Active
                  </span>
                </div>

                {/* Email Verification */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-500">
                    Email Verification
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      user.emailVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>

                {/* Creation Date */}
                <div className="mt-6 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#174C3A]/10 text-lg text-[#174C3A]">
                    <FiCalendar />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Member Since
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-800">
                      {formatDate(accountCreated)}
                    </p>
                  </div>
                </div>

                {/* Last Sign In */}
                <div className="mt-5 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#174C3A]/10 text-lg text-[#174C3A]">
                    <FiClock />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Last Sign In
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-800">
                      {formatDateTime(lastSignIn)}
                    </p>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-[#174C3A] p-5 text-white">
                  <div className="flex items-center gap-2 text-[#D8B66D]">
                    <FiCheckCircle />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Welcome Back
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Thank you for being a part of Abrar's Dine. We are delighted
                    to have you with us.
                  </p>

                  <Link
                    to="/"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#D8B66D] transition hover:text-white"
                  >
                    Explore Our Website
                    <FiArrowLeft className="rotate-180" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-7 text-center text-xs leading-6 text-gray-400">
          © {new Date().getFullYear()} Abrar's Dine. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default UserProfile;
