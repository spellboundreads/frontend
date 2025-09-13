"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { register } from "@/api/auth";

export default function LoginModal() {
  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    event?.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
    }
    try {
      const { confirmPassword, ...userData } = formData;

      const data = await register(userData);
      localStorage.setItem("token", data.token);
      alert(data);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="bg-white text-black flex flex-col gap-4 p-16 border items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className={`text-3xl font-serif`}>Create an Account</h1>
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
          label="username"
          type="text"
          id="username"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          label="Display name"
          type="text"
          id="display_name"
          name="display_name"
          required
          value={formData.display_name}
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
        <Input
          label="confirm password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
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
