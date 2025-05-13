import { useActionState, useContext } from "react";
import { useFormStatus } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FormContext } from "@/contexts/FormContext";
import { login } from "./actions";
import { GoogleLoginButton } from "./GoogleLoginButton";
import Button from "@/app/components/page/Button";
import { usePasswordToggle } from "@/hooks/auth";

export default function LogInForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const {
    inputRef: passwordInputRef,
    showPassword,
    togglePasswordVisibility,
  } = usePasswordToggle();

  return (
    <form action={loginAction}>
      {state?.errors?.form && (
        <div className="bg-red-200 border border-red-500 text-red-500 text-center font-raleway rounded-md p-2 mb-3">
          <p>{state.errors.form}</p>
        </div>
      )}
      {/* email */}
      <div className="form__field">
        <label htmlFor="login-email" className="form__label sr-only">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          className="form__input"
          autoComplete="email"
        />
        {state?.errors?.email && (
          <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
            {state.errors.email}
          </p>
        )}
      </div>
      {/* password */}
      <div className="form__field relative">
        <label htmlFor="login-password" className="form__label sr-only">
          Password
        </label>
        <input
          ref={passwordInputRef}
          id="login-password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="form__input pr-10"
          autoComplete="current-password"
        />
        <button
          type="button"
          onMouseDown={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none hover:cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
        {state?.errors?.password && (
          <p className="font-poppins text-red-500 text-xs md:text-sm normal-case">
            {state.errors.password}
          </p>
        )}
      </div>
      {/* submit */}
      <div className="flex flex-col gap-y-2">
        <SubmitButton />
        <GoogleLoginButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const { isGoogleLoading } = useContext(FormContext);

  return (
    <Button
      type="submit"
      disabled={pending || isGoogleLoading}
      className="bg-accent-1 before:bg-accent-1-hover w-full"
    >
      <span className="form__submit-btn__p">
        {pending ? "Logging in..." : "Login"}
      </span>
    </Button>
  );
}
