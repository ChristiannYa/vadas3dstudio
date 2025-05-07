import { Form } from "./Form";

type SignupProps = {
  setIsFlipped: (value: boolean) => void;
};

export default function Signup({ setIsFlipped }: SignupProps) {
  return (
    <>
      <h2 className="form__title">Sign Up</h2>
      <Form />
      <p className="font-raleway text-sm text-center normal-case leading-none mt-3">
        Already have an account?{" "}
        <button onClick={() => setIsFlipped(false)}>
          <p className="font-raleway text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
            Log in
          </p>
        </button>
      </p>
    </>
  );
}
