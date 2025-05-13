import { CardFace } from "@/app/definitions";
import CloseFormButton from "../CloseFormButton";
import SignupForm from "./SignupForm";

export default function SignupFace({
  toggleFlip,
  closeModal,
  isFlipped,
}: CardFace) {
  return (
    <div
      className={`card__face ${
        isFlipped
          ? "[transform:translateY(-50%)_rotateY(0deg)]"
          : "[transform:translateY(-50%)_rotateY(180deg)]"
      }`}
    >
      <CloseFormButton closeModal={closeModal} />
      <h2 className="form__title">Sign Up</h2>
      <SignupForm />
      <p className="font-raleway text-sm text-center normal-case leading-none mt-4">
        Already have an account?{" "}
        <button onClick={toggleFlip}>
          <p className="font-raleway text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
            Log in
          </p>
        </button>
      </p>
    </div>
  );
}
