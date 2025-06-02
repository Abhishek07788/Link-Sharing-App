import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const getDecodedToken = (token) => {
  const finalToken = Cookies.get("token") || token;
  if (finalToken) {
    try {
      return jwtDecode(finalToken);
    } catch (error) {
      Cookies.remove("token");
      return null;
    }
  }
  return null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  // Initialize user from token
  useEffect(() => {
    const decoded = getDecodedToken();
    if (decoded) {
      setUser({
        userId: decoded.id,
        name: decoded.name,
        username: decoded.username,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user?.username) {
      router.push("/profile");
    }
  }, [user, loading, router]);

  const handleLogin = (token) => {
    try {
      Cookies.set("token", token, { expires: 7 });
      const decoded = getDecodedToken(token);
      if (decoded) {
        setUser({
          userId: decoded.id,
          name: decoded.name,
          username: decoded.username,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    }
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/profile");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        user,
        handleLogin,
        handleLogOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
