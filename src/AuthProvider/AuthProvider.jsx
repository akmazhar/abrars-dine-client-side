import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a new user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const logOut = () => {
    return signOut(auth);
  };

  // Monitor Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Authentication state error:", error);
        setUser(null);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
