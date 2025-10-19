"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { register } from "@/api/auth";
import { toast } from "sonner";

// TODO: handle errors
export default function RegisterForm({ onSubmit }: { onSubmit?: () => void }) {
  const [error, setError] = useState<string | null>(null);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    try {
      const response = await register(formData);
      localStorage.setItem("access", response.data.accessToken);
      toast("Registration successful");
      window.location.reload();
      onSubmit?.();
    } catch (error: any) {
      console.log(error);
      if (error.response.data.statusCode === 409) {
        setError(
          `This ${error.response.data.fields[0]} has been registered with another account.`
        );
      } else {
        toast("Something wrong happened during registration");
      }
    }
  }

  return (
    <div className="bg-white text-black flex flex-col gap-4  items-center">
      <form className="flex flex-col gap-4 max-w-72" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
