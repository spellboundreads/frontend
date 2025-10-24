"use client";
import Input from "@/components/Input";
import { FieldError, ErrorMessage } from "@/components/form/error";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <form className="flex flex-col gap-4 max-w-72" action={action}>
      {state?.message && <ErrorMessage message={state.message} />}

      <div className="flex flex-col gap-2">
        <Input label="Email" type="email" id="email" name="email" required />
        {state?.errors?.email && <FieldError message={state.errors.email[0]} />}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="username"
          type="text"
          id="username"
          name="username"
          required
        />
        {state?.errors?.username && (
          <FieldError message={state.errors.username[0]} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="display name"
          type="text"
          id="display_name"
          name="display_name"
          required
        />
        {state?.errors?.display_name && (
          <FieldError message={state.errors.display_name[0]} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="password"
          type="password"
          id="password"
          name="password"
          required
        />
        {state?.errors?.password && (
          <FieldError message={state.errors.password[0]} />
        )}
      </div>
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
