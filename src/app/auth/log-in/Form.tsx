import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { GoogleLoginButton } from "./GoogleLoginButton";
import Button from "@/app/components/page/Button";

export function Form() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction}>
      {state?.errors?.form && (
        <div className="bg-red-200 border border-red-500 text-red-500 text-center font-raleway rounded-md p-2 mb-3">
          <p>{state.errors.form}</p>
        </div>
      )}
      {/* email */}
      <div className="form__field">
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          className="form__input"
        />
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>

      {/* password */}
      <div className="form__field">
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          className="form__input"
        />
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
      </div>
      {/* submit */}
      <div className="flex gap-x-4">
        <SubmitButton />
        <GoogleLoginButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      <span className="form__submit-btn__p">
        {pending ? "Logging in..." : "Login"}
      </span>
    </Button>
  );
}
