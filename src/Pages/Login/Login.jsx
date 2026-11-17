import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import {
  FiCoffee,
  FiLock,
  FiCheckCircle,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import "./Login.css";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Firebase Error Messages
  const getFirebaseErrorMessage = (error) => {
    const errorMessages = {
      "auth/invalid-credential": "Invalid email or password. Please try again.",

      "auth/user-not-found": "No account found with this email address.",

      "auth/wrong-password": "Incorrect password. Please try again.",

      "auth/too-many-requests": "Too many attempts. Please try again later.",

      "auth/network-request-failed":
        "Network error. Please check your internet connection.",

      "auth/invalid-email": "Please enter a valid email address.",

      "auth/user-disabled": "This account has been disabled.",

      "auth/popup-closed-by-user": "Google sign-in was cancelled.",

      "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
    };

    return (
      errorMessages[error?.code] || "Something went wrong. Please try again."
    );
  };

  // Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      await signInUser(email, password);

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        confirmButtonColor: "#174C3A",
        timer: 1800,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Email Login Error:", error);

      const message = getFirebaseErrorMessage(error);

      setLoginError(message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonColor: "#174C3A",
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgetPassword = async () => {
    const email = emailRef.current?.value.trim();

    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Email Required",
        text: "Please enter your registered email address first.",
        confirmButtonColor: "#174C3A",
      });

      emailRef.current?.focus();
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        title: "Reset Email Sent!",
        text: "Please check your inbox for the password reset link.",
        confirmButtonColor: "#174C3A",
      });
    } catch (error) {
      console.error("Password Reset Error:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Send Email",
        text: getFirebaseErrorMessage(error),
        confirmButtonColor: "#174C3A",
      });
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    if (!signInWithGoogle) {
      Swal.fire({
        icon: "error",
        title: "Google Login Unavailable",
        text: "Google authentication is not configured correctly.",
        confirmButtonColor: "#174C3A",
      });

      return;
    }

    setGoogleLoading(true);
    setLoginError("");

    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);

      const message = getFirebaseErrorMessage(error);

      setLoginError(message);

      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: message,
        confirmButtonColor: "#174C3A",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="login-page min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Abrar's Dine | Login</title>
        <meta
          name="description"
          content="Login to Abrar's Dine and enjoy a delightful dining experience."
        />
      </Helmet>

      <div className="login-container w-full max-w-6xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: BRANDING SECTION */}
          <div className="login-visual relative flex flex-col justify-between overflow-hidden p-7 sm:p-10 lg:p-12">
            <div className="absolute inset-0">
              <img
                src="https://i.ibb.co/gwJzscB/login.jpg"
                alt="Delicious dining experience"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-emerald-950/80"></div>
            </div>

            <div className="relative z-10">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="brand-icon">
                  <FiCoffee size={25} />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold tracking-wide text-white">
                    Abrar's <span className="text-emerald-400">Dine</span>
                  </h2>

                  <p className="text-[10px] uppercase tracking-[3px] text-gray-300">
                    Taste Beyond Expectations
                  </p>
                </div>
              </Link>
            </div>

            <div className="relative z-10 my-16 lg:my-0">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                WELCOME TO ABRAR'S DINE
              </span>

              <h1 className="max-w-lg text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[52px]">
                Good Food.
                <br />
                Great Moments.
                <br />
                <span className="text-emerald-400">Better Together.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-300 sm:text-base">
                Your favourite flavours are just a login away. Sign in and
                discover a wonderful dining experience crafted especially for
                you.
              </p>

              <div className="mt-8 flex flex-wrap gap-5">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <FiCheckCircle className="text-emerald-400" />
                  Fresh & Delicious
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <FiCheckCircle className="text-emerald-400" />
                  Made With Passion
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/20 pt-5">
              <p className="text-xs tracking-wide text-gray-400">
                © {new Date().getFullYear()} Abrar's Dine. All rights reserved.
              </p>
            </div>
          </div>

          {/* RIGHT: LOGIN FORM */}
          <div className="login-form-section flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="w-full max-w-md">
              <div className="mb-9">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <FiLock size={23} />
                </div>

                <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-emerald-600">
                  MEMBER ACCESS
                </p>

                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome Back!
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Sign in to continue your delicious journey with us.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="login-input-wrapper">
                    <FiMail className="login-input-icon" />

                    <input
                      ref={emailRef}
                      id="login-email"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="login-input"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={handleForgetPassword}
                      className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-800"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="login-input-wrapper">
                    <FiLock className="login-input-icon" />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="login-input pr-12"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="password-toggle"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* ERROR MESSAGE */}
                {loginError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {loginError}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="login-submit-btn group flex w-full items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-7 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-emerald-600 transition hover:text-emerald-800"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* DIVIDER */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200"></div>

                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                className="google-login-btn flex w-full items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FcGoogle size={23} />
                )}

                <span>
                  {googleLoading ? "Connecting..." : "Continue with Google"}
                </span>
              </button>

              {/* SECURITY NOTE */}
              <div className="mt-8 flex items-center justify-center gap-2 text-center">
                <FiShield className="text-emerald-600" size={15} />

                <p className="text-xs text-gray-400">
                  Your account information is securely protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
