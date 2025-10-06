"use client";
import Hero from "@/components/Hero";
import LoginModal from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/Header";
import { getWork } from "@/api/work";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function Home() {
  const { login, register } = useAuth();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleLoginClick() {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  }

  function handleRegisterClick() {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  }

  function closeModals() {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  }

  return (
    <div className={`min-h-screen bg-[#f5f3ee] relative`}>
      <div
        className={`${
          isRegisterModalOpen || isLoginModalOpen
            ? "fixed bg-gray-600 h-full w-full z-50 opacity-70 top-0 left-0"
            : ""
        }`}
      ></div>
      <Header
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
      />
      <Hero
        headline="Discover Your Next Favorite Book"
        description="Explore our curated collection of books tailored just for you."
      />

      {(isRegisterModalOpen || isLoginModalOpen) && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-100 shadow-2xl">
          {isRegisterModalOpen && <RegisterForm onSubmit={closeModals} />}
          {isLoginModalOpen && <LoginModal onSubmit={closeModals} />}
        </div>
      )}
    </div>
  );
}
