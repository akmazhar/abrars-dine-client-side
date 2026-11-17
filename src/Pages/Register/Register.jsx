import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCamera,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email and Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const accepted = form.terms.checked;

    setRegisterError("");

    // Validation
    if (!name) {
      setRegisterError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must contain at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
      setRegisterError("Password must contain at least one special character.");
      return;
    }

    if (!accepted) {
      setRegisterError("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase Account
      const result = await createUser(email, password);

      // Update Firebase User Profile
      await updateProfile(result.user, {
        displayName: name,
        ...(photo ? { photoURL: photo } : {}),
      });

      await Swal.fire({
        icon: "success",
        title: "Welcome to Abrar's Dine!",
        text: "Your account has been created successfully.",
        confirmButtonText: "Explore Now",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#174C3A",
      });

      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);

      const errorMessages = {
        "auth/email-already-in-use":
          "This email address is already registered.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/network-request-failed":
          "Network error. Please check your internet connection.",
        "auth/operation-not-allowed":
          "Email registration is currently unavailable.",
      };

      setRegisterError(
        errorMessages[error.code] || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogleSignIn = async () => {
    try {
      setRegisterError("");
      setGoogleLoading(true);

      await signInWithGoogle();

      await Swal.fire({
        icon: "success",
        title: "Welcome to Abrar's Dine!",
        text: "You have successfully signed in with Google.",
        confirmButtonColor: "#174C3A",
        background: "#F5F1E8",
        color: "#174C3A",
      });

      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error);

      if (error.code !== "auth/popup-closed-by-user") {
        setRegisterError(
          error.code === "auth/popup-blocked"
            ? "Your browser blocked the Google sign-in popup."
            : "Google sign-in failed. Please try again.",
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F1E8] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(16,57,44,0.12)] lg:min-h-[720px] lg:grid-cols-2">
        {/* LEFT SIDE - BRANDING */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#174C3A] p-10 text-white lg:flex xl:p-14">
          {/* Decorative Elements */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/[0.04]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B58A42] text-xl font-bold text-white shadow-lg">
                A
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-wide">
                  ABRAR'S DINE
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-[3px] text-[#D9C59D]">
                  Taste of Excellence
                </p>
              </div>
            </div>

            <div className="mt-20 max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E8D5AF]">
                <FiCheckCircle />
                Join Our Community
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-[1.2] tracking-tight xl:text-5xl">
                Good Food.
                <br />
                Great Moments.
                <br />
                <span className="text-[#D8B66D]">Made for You.</span>
              </h1>

              <p className="mt-6 max-w-sm text-base leading-8 text-white/75">
                Discover delicious food, explore exceptional flavours and enjoy
                a delightful dining experience with Abrar's Dine.
              </p>
            </div>
          </div>

          {/* Brand Image */}
          <div className="relative z-10 mt-8">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85"
                alt="Delicious gourmet food"
                className="h-64 w-full rounded-2xl object-cover xl:h-72"
                loading="lazy"
              />
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-white/60">
              <span>Experience the joy of great food.</span>
              <span className="font-semibold text-[#D8B66D]">
                Since Abrar's Dine
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTRATION FORM */}
        <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          {/* Mobile Branding */}
          <div className="mb-9 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#174C3A] text-xl font-bold text-white">
              A
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-wide text-[#174C3A]">
                ABRAR'S DINE
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#B58A42]">
                Taste of Excellence
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#B58A42]">
              Create Your Account
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#174C3A] sm:text-4xl">
              Join Abrar's Dine
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Create your account and start enjoying a better food experience.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  className="h-13 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#174C3A] focus:bg-white focus:ring-4 focus:ring-[#174C3A]/10"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="register-photo"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Profile Photo URL
                <span className="ml-2 text-xs font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <FiCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                <input
                  id="register-photo"
                  type="url"
                  name="photo"
                  placeholder="https://example.com/photo.jpg"
                  autoComplete="url"
                  className="h-13 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#174C3A] focus:bg-white focus:ring-4 focus:ring-[#174C3A]/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="h-13 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#174C3A] focus:bg-white focus:ring-4 focus:ring-[#174C3A]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#B58A42]" />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  required
                  className="h-13 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-12 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#174C3A] focus:bg-white focus:ring-4 focus:ring-[#174C3A]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-400 transition hover:text-[#174C3A]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Minimum 6 characters, at least one uppercase letter and one
                special character.
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                name="terms"
                id="register-terms"
                required
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#174C3A]"
              />

              <label
                htmlFor="register-terms"
                className="cursor-pointer text-xs leading-6 text-gray-500 sm:text-sm"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-[#174C3A] underline decoration-[#B58A42] underline-offset-4 hover:text-[#B58A42]"
                >
                  Terms & Conditions
                </Link>{" "}
                and Privacy Policy.
              </label>
            </div>

            {/* Error Message */}
            {registerError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600"
              >
                {registerError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#174C3A] px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-[#174C3A]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#10392C] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-[#174C3A] hover:bg-[#FAFAF8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm text-[#174C3A]" />
            ) : (
              <FcGoogle className="text-xl" />
            )}

            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
          </button>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#174C3A] underline decoration-[#B58A42] underline-offset-4 transition hover:text-[#B58A42]"
            >
              Sign In
            </Link>
          </p>

          {/* Security Note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
            <FiShield className="text-[#B58A42]" />
            Your information is protected and secure.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
