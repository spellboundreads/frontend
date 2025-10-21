"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { registerAction } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerAction(formData);

      if (result.success) {
        toast.success("Registration successful");
        onSubmit?.();
        router.refresh();
      } else {
        if (result.statusCode === 409) {
          setError(
            result.error || "This email or username is already registered."
          );
        } else {
          setError(result.error || "Something went wrong during registration");
        }
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
          className="rounded-3xl border p-2 bg-black text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Create an account"}
        </button>
      </form>

      <div className="flex justify-center text-sm">
        <button>Forgot password?</button>
      </div>
    </div>
  );
}
