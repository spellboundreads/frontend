"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { register } from "@/api/auth";

// TODO: handle errors
export default function RegisterForm({ onSubmit }: { onSubmit?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    display_name: "",
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
    try {
      const response = await register(formData);
      localStorage.setItem("access", response.data.accessToken);
      onSubmit?.();
    } catch (error: any) {
      alert("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white text-black flex  flex-col gap-4 py-8 px-20 border items-center rounded-sm shadow-lg">
      <div className="flex flex-col gap-2 items-center">
        <h1 className={`text-3xl font-serif text-center`}>Create an Account</h1>
        <p className="text-sm text-center">
          Discover your next favorite books.
        </p>
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
          Create an account
        </button>
      </form>

      <div className="flex justify-center text-sm">
        <button>Forgot password?</button>
      </div>
    </div>
  );
}
