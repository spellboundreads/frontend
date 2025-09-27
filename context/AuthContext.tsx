"use client"

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import * as authApi from "@/api/auth";

interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    display_name: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const currentUser = await authApi.getMe(); // call /users/me
          setUser(currentUser.data);
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await authApi.login(data);
      const { access_token } = response.data;

      localStorage.setItem("accessToken", access_token);

      const currentUser = await authApi.getMe(); // call /users/me
      setUser(currentUser);

      // router.push("/work");
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const register = async (data: {
    email: string;
    username: string;
    password: string;
    display_name: string;
  }) => {
    try {
      const response = await authApi.register(data);
      const { access_token } = response.data;

      localStorage.setItem("accessToken", access_token);

      // fetch current user after register
      const currentUser = await authApi.getMe();
      setUser(currentUser);

      // router.push("/dashboard");
    } catch (err) {
      console.error("Register failed:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    // router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
