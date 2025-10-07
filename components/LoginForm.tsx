"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm({ onSubmit }: { onSubmit?: () => void }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      onSubmit?.();
      alert("Login successful");
    } catch (error: any) {
      alert("Something wrong happened during signin");
    }
  }

  return (
    <div className="bg-white text-xs text-black flex gap-3 items-center">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="password"
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-sm uppercase font-bold border p-2 bg-black text-white self-end text-center max-h-1/2"
        >
          sign in
        </button>
      </form>
    </div>
  );
}
