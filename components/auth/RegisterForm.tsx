"use client";
import { useActionState } from "react";
import Input from "@/components/Input";
import { register } from "@/app/actions/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);
  return (
    <form className="flex flex-col gap-4 max-w-72" action={action}>
      {state?.errors && (
        <p className="text-red-500 text-sm text-center">{state.errors}</p>
      )}

      <Input label="Email" type="email" id="email" name="email" required />
      <Input
        label="username"
        type="text"
        id="username"
        name="username"
        required
      />
      <Input
        label="display name"
        type="text"
        id="display_name"
        name="display_name"
        required
      />
      <Input
        label="password"
        type="password"
        id="password"
        name="password"
        required
      />

      <button
        type="submit"
        className="rounded-3xl border p-2 bg-black text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Creating account..." : "Create an account"}
      </button>
    </form>
  );
}
