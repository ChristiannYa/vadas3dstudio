import { CardFace } from "@/app/definitions";
import { WhiteLogo } from "@/app/assets/icons/main";
import CloseFormButton from "../CloseFormButton";
import LoginForm from "./LogInForm";

export default function LogInFace({
  toggleFlip,
  closeModal,
  isFlipped,
}: CardFace) {
  return (
    <div
      className={`card__face ${
        isFlipped
          ? "[transform:translateY(-50%)_rotateY(-180deg)]"
          : "[transform:translateY(-50%)_rotateY(0deg)]"
      }`}
    >
      <CloseFormButton closeModal={closeModal} />
      <h2 className="form__title">Log in</h2>
      <LoginForm />
      <button className="cursor-pointer mt-4 mx-auto" onClick={toggleFlip}>
        <p className="font-raleway text-white-fg dark:text-fg text-sm text-center hover:text-accent-1 leading-none">
          Sign up for a new account
        </p>
      </button>
      <div className="mt-6 flex flex-col justify-center items-center">
        <WhiteLogo />
      </div>
    </div>
  );
}
