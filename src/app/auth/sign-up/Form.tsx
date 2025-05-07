import { useActionState } from "react";
import { register } from "./actions";
import Button from "@/app/components/page/Button";
import { useFormStatus } from "react-dom";

export function Form() {
  const [state, registerAction] = useActionState(register, undefined);

  return (
    <form action={registerAction} className="space-y-3">
      {state?.errors?.form && (
        <div className="bg-red-200 border border-red-500 text-red-500 text-center font-raleway rounded-md p-2 mb-3">
          <p>{state.errors.form}</p>
        </div>
      )}
      {/* name */}
      <div className="space-y-1.5">
        <div>
          <label className="form__label">Name</label>
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Name"
            className="form__input"
          />
        </div>
        {state?.errors?.name && (
          <p className="text-red-500">{state.errors.name}</p>
        )}
      </div>
      {/* last name */}
      <div className="space-y-1.5">
        <div>
          <label className="form__label">Last Name</label>
          <input
            id="signup-lastName"
            name="last_name"
            type="text"
            placeholder="Last Name"
            className="form__input"
          />
        </div>
        {state?.errors?.last_name && (
          <p className="text-red-500">{state.errors.last_name}</p>
        )}
      </div>
      {/* email */}
      <div className="space-y-1.5">
        <div>
          <label className="form__label">Email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="Email"
            className="form__input"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
      </div>
      {/* password */}
      <div className="space-y-1.5">
        <div>
          <label className="form__label">Password</label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Password"
            className="form__input"
          />
        </div>
        {state?.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}
      </div>
      {/* confirm password */}
      <div className="space-y-1.5">
        <div>
          <label className="form__label">Confirm Password</label>
          <input
            id="signup-confirmPassword"
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            className="form__input"
          />
        </div>
        {state?.errors?.confirm_password && (
          <p className="text-red-500">{state.errors.confirm_password}</p>
        )}
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
        {pending ? "Signing up..." : "Sign up"}
      </span>
    </Button>
  );
}
