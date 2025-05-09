import { Form } from "./Form";

type SignupProps = {
  setIsFlipped: (value: boolean) => void;
  isOpen: boolean;
  isFlipped: boolean;
};

export default function Signup({ setIsFlipped }: SignupProps) {
  const handleFlip = () => {
    setIsFlipped(false);
  };

  return (
    <div>
      <h2 className="form__title">Sign Up</h2>
      <Form />
      <p className="font-raleway text-sm text-center normal-case leading-none mt-3">
        Already have an account?{" "}
        <button onClick={handleFlip}>
          <p className="font-raleway text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
            Log in
          </p>
        </button>
      </p>
    </div>
  );
}
