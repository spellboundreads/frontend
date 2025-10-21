"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        toast.success("Login successful");
        onSubmit?.();
        // Use router.refresh() to revalidate server components
        router.refresh();
      } else {
        if (result.statusCode === 404) {
          setError("User not found. Please check your email.");
        } else if (result.statusCode === 401) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError(result.error || "Login failed. Please try again.");
        }
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
        className="rounded-sm uppercase font-bold border p-2 bg-black text-white text-center max-h-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "sign in"}
      </button>
    </form>
  );
}
