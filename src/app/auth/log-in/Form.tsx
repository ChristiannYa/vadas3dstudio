import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/app/components/page/Button";
import { login } from "./actions";

export function Form() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="space-y-3">
      <div className="space-y-3">
        {state?.errors?.form && (
          <div className="bg-red-200 border border-red-500 text-red-500 text-center font-raleway rounded-md p-2 mb-3">
            <p>{state.errors.form}</p>
          </div>
        )}
        {/* email */}
        <div className="space-y-1.5">
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
        <div className="space-y-1.5">
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
      </div>
      {/* submit */}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full">
      <span className="form__submit-btn__p">
        {pending ? "Logging in..." : "Login"}
      </span>
    </Button>
  );
}
