"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { toast } from "sonner";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
export default function LoginForm({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
      await login({
        email: formData.email,
        password: formData.password,
      });
      onSubmit?.();
      toast("Login successful");

      router.refresh();
    } catch (error: any) {
      if (error.response.data.statusCode === 404) {
        setError("User not found. Please check your email.");
      } else if (error.response.data.statusCode === 401) {
        setError("Invalid credentials. Please try again.");
      }
    }
  }

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
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
        className="rounded-sm uppercase font-bold border p-2 bg-black text-white  text-center max-h-1/2"
      >
        sign in
      </button>
    </form>
  );
}
