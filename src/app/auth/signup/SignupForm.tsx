import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { register } from "./actions";
import Button from "@/app/components/page/Button";
import { usePasswordToggle } from "@/hooks/auth";

export default function SignupForm() {
  const [state, registerAction] = useActionState(register, undefined);
  const {
    inputRef: passwordInputRef,
    showPassword,
    togglePasswordVisibility,
  } = usePasswordToggle();

  const {
    inputRef: confirmPasswordInputRef,
    showPassword: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordToggle();

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
            <label htmlFor="signup-name" className="form__label">
              Name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={state?.values?.name || ""}
              className="form__input"
              autoComplete="given-name"
            />
          </div>
          {state?.errors?.name && (
            <p className="form__field--error-message">{state.errors.name}</p>
          )}
        </div>
        {/* last name */}
        <div className="form__field">
          <div>
            <label htmlFor="signup-lastName" className="form__label">
              Last Name
            </label>
            <input
              id="signup-lastName"
              name="last_name"
              type="text"
              placeholder="Last Name"
              defaultValue={state?.values?.last_name || ""}
              className="form__input"
              autoComplete="family-name"
            />
          </div>
          {state?.errors?.last_name && (
            <p className="form__field--error-message">
              {state.errors.last_name}
            </p>
          )}
        </div>
        {/* email */}
        <div className="form__field">
          <div>
            <label htmlFor="signup-email" className="form__label">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={state?.values?.email || ""}
              className="form__input"
              autoComplete="email"
            />
          </div>
          {state?.errors?.email && (
            <p className="form__field--error-message">{state.errors.email}</p>
          )}
        </div>
        {/* password */}
        <div className="form__field">
          <div>
            <label htmlFor="signup-password" className="form__label">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form__input pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onMouseDown={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          {state?.errors?.password && (
            <p className="form__field--error-message">
              {state.errors.password}
            </p>
          )}
        </div>
        {/* confirm password */}
        <div className="form__field">
          <div>
            <label htmlFor="signup-confirmPassword" className="form__label">
              Confirm Password
            </label>
            <div className="relative">
              <input
                ref={confirmPasswordInputRef}
                id="signup-confirmPassword"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="form__input pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onMouseDown={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </div>
          {state?.errors?.confirm_password && (
            <p className="form__field--error-message">
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
