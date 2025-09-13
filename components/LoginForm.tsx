"use client";
import { useState } from "react";
import Input from "@/components/Input";

export default function LoginModal() {
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

  function handleSubmit() {
    event?.preventDefault();
    console.log(`Form submitted: ${formData.email}, ${formData.password}s`);
  }

  return (
    <div className="bg-white text-black flex flex-col gap-4 p-16 border items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className={`text-3xl font-serif`}>Login to Your Account</h1>
        <p>Discover your next favorite books.</p>
      </div>

      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
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
          className="rounded-3xl border p-2 bg-black text-white w-full"
        >
          Login
        </button>
      </form>

      <div className="flex justify-center text-sm">
        <button>Forgot password?</button>
      </div>
    </div>
  );
}
