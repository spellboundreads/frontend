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
        aria-disabled={pending}
        type="submit"
        className={`rounded-3xl border p-2 text-white w-full font-semibold uppercase ${
          pending ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
