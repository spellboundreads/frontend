"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const currentUser = await authApi.getMe();
          setUser(currentUser as User);
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await authApi.login(data);
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      const currentUser = await authApi.getMe(); 
      setUser(currentUser as User);

      // router.push("/work");
    } catch (err) {
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
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      const currentUser = await authApi.getMe();
      setUser(currentUser as User);

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
