"use client";

import { useEffect, useState } from "react";

export default function useAuth() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    try {

      const currentUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (currentUser) {
        setUser(currentUser);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }, []);

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    window.location.href = "/signin";

  };

  return {

    user,

    loading,

    isAuthenticated: !!user,

    role: user?.role,

    logout,

  };

}