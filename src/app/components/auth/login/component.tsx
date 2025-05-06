import Form from "./Form";
import { WhiteLogo } from "@/app/assets/icons/page";

type LoginProps = {
  setIsFlipped: (value: boolean) => void;
};

export default function Login({ setIsFlipped }: LoginProps) {
  return (
    <>
      <h2 className="form__title">Vada 3d Studio</h2>
      <Form />
      <button onClick={() => setIsFlipped(true)} className="block mt-3 mx-auto">
        <p className="font-raleway text-white-fg dark:text-fg text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
          Sign up for a new account
        </p>
      </button>
      <div className="mt-14 flex justify-center items-center">
        <WhiteLogo />
      </div>
    </>
  );
}
