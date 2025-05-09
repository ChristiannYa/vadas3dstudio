import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "./actions";
import Button from "@/app/components/page/Button";

export default function SignupForm() {
  const [state, registerAction] = useActionState(register, undefined);

  return (
    <form action={registerAction}>
      {state?.errors?.form && (
        <div className="bg-red-200 border border-red-500 text-red-500 text-center font-raleway rounded-md p-2 mb-3">
          <p>{state.errors.form}</p>
        </div>
      )}
      <div className="form__labels">
        {/* name */}
        <div className="form__field">
          <div>
            <label className="form__label">Name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={state?.values?.name || ""}
              className="form__input"
            />
          </div>
          {state?.errors?.name && (
            <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
              {state.errors.name}
            </p>
          )}
        </div>
        {/* last name */}
        <div className="form__field">
          <div>
            <label className="form__label">Last Name</label>
            <input
              id="signup-lastName"
              name="last_name"
              type="text"
              placeholder="Last Name"
              defaultValue={state?.values?.last_name || ""}
              className="form__input"
            />
          </div>
          {state?.errors?.last_name && (
            <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
              {state.errors.last_name}
            </p>
          )}
        </div>
        {/* email */}
        <div className="form__field">
          <div>
            <label className="form__label">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={state?.values?.email || ""}
              className="form__input"
            />
          </div>
          {state?.errors?.email && (
            <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
              {state.errors.email}
            </p>
          )}
        </div>
        {/* password */}
        <div className="form__field">
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
            <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
              {state.errors.password}
            </p>
          )}
        </div>
        {/* confirm password */}
        <div className="form__field">
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
            <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
              {state.errors.confirm_password}
            </p>
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
    <Button
      type="submit"
      disabled={pending}
      className="bg-accent-1 before:bg-accent-1-hover w-full"
    >
      <span className="form__submit-btn__p">
        {pending ? "Signing up..." : "Sign up"}
      </span>
    </Button>
  );
}
