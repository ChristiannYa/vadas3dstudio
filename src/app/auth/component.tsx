"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/auth";
import { WhiteLogo } from "../assets/icons/page";
import { Form as FormLogin } from "./log-in/Form";
import { Form as FormSignup } from "./sign-up/Form";

export function LoginForm() {
  const router = useRouter();
  const { user, loading } = useUser();
  const displayName = user?.isLoggedIn
    ? `${user.user?.name} ${user.user?.last_name}`.trim()
    : "Login";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClick = () => {
    if (user?.isLoggedIn) {
      router.push("/profile");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {loading ? (
        <div className="px-2 py-1 flex items-center justify-center">
          <span className="inline-block w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
        </div>
      ) : (
        <button onClick={handleButtonClick} className="nav__item a">
          {displayName}
        </button>
      )}

      {/* Modal overlay with transition */}
      <div
        className={`bg-black/10 transition-opacity duration-300 fixed inset-0 z-10 ${
          isOpen ? "opacity-100 no-doc-scroll" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div>
        <div
          className={`backdrop-blur-lg w-[100dvw] h-[100dvh] rounded-lg overflow-hidden flex justify-center items-center z-50 fixed left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
            isOpen
              ? "top-1/2 -translate-y-1/2 opacity-100"
              : "top-[60%] -translate-y-1/2 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative w-[296px] lg:w-[304px] min-h-full [perspective:1000px] [transform-style:preserve-3d]`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Front of card */}
            <div
              className={`bg-white/20 rounded-2xl p-4 lg:p-6 absolute top-1/2 left-0 w-full h-fit flex flex-col justify-center [backface-visibility:hidden] transition-transform duration-600 ${
                isFlipped
                  ? "[transform:translateY(-50%)_rotateY(-180deg)]"
                  : "[transform:translateY(-50%)_rotateY(0deg)]"
              }`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-accent-1 hover:bg-accent-1-hover rounded-full w-5 h-5 flex flex-col justify-center items-center leading-none absolute top-4 right-4"
              >
                x
              </button>
              <h2 className="form__title">Log in</h2>
              <FormLogin />
              <button className="block mt-3 mx-auto" onClick={toggleFlip}>
                <p className="font-raleway text-white-fg dark:text-fg text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
                  Sign up for a new account
                </p>
              </button>
              <div className="mt-6 flex flex-col justify-center items-center">
                <WhiteLogo />
              </div>
            </div>
            {/* Back of card */}
            <div
              className={`bg-white/20 rounded-2xl overflow-hidden p-4 lg:p-6 absolute top-1/2 left-0 w-full h-fit flex flex-col justify-center [backface-visibility:hidden] transition-transform duration-600 ${
                isFlipped
                  ? "[transform:translateY(-50%)_rotateY(0deg)]"
                  : "[transform:translateY(-50%)_rotateY(180deg)]"
              }`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer bg-accent-1 hover:bg-accent-1-hover rounded-full w-5 h-5 flex flex-col justify-center items-center leading-none absolute top-4 right-4"
              >
                x
              </button>
              <h2 className="form__title">Sign Up</h2>
              <FormSignup />
              <p className="font-raleway text-sm text-center normal-case leading-none mt-3">
                Already have an account?{" "}
                <button onClick={toggleFlip}>
                  <p className="font-raleway text-sm text-center hover:text-accent-1 leading-none cursor-pointer">
                    Log in
                  </p>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
