"use client";
import Hero from "@/components/Hero";
import LoginModal from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/Header";
import { getWork } from "@/api/work";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f5f3ee] relative">
        <Header />
        <Hero
          headline="Discover Your Next Favorite Book"
          description="Explore our curated collection of books tailored just for you."
        />
        {/* <RegisterForm /> */}
        <LoginModal />
      </div>
    </AuthProvider>
  );
}
