"use client";

import { useContext, useState } from "react";
import { FormContext, FormProvider } from "@/contexts/FormContext";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/auth";
import LogInFace from "./log-in/LogInFace";
import SignupFace from "./signup/SignupFace";

export function LoginForm() {
  const { loginFormReset, signupFormReset } = useContext(FormContext);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
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

  const handleCloseModal = () => {
    loginFormReset();
    signupFormReset();
    setIsOpen(false);
    setIsFlipped(false);
  };

  return (
    <>
      {loading ? (
        <div className="px-2 py-1 flex items-center justify-center">
          <span className="inline-block w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
        </div>
      ) : user?.isLoggedIn ? (
        <button
          onClick={handleButtonClick}
          className={`nav__item a ${
            pathname.startsWith("/profile") ? "active" : ""
          }`}
        >
          <p>Profile</p>
        </button>
      ) : (
        <button onClick={handleButtonClick} className="nav__item a">
          <p>Login</p>
        </button>
      )}
      {/* Modal overlay with transition */}
      <div
        className={`bg-black/10 transition-opacity duration-300 fixed inset-0 z-10 ${
          isOpen ? "opacity-100 no-doc-scroll" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseModal}
      />
      <div>
        <div
          className={`backdrop-blur-xl w-[100dvw] h-[100dvh] rounded-lg overflow-hidden flex justify-center items-center z-50 fixed left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
            isOpen
              ? "top-1/2 -translate-y-1/2 opacity-100"
              : "top-[60%] -translate-y-1/2 opacity-0 pointer-events-none"
          }`}
        >
          <FormProvider>
            <div className="card__wrapper" onClick={(e) => e.stopPropagation()}>
              {/* Front of card */}
              <LogInFace
                toggleFlip={toggleFlip}
                closeModal={() => setIsOpen(false)}
                isFlipped={isFlipped}
              />
              {/* Back of card */}
              <SignupFace
                toggleFlip={toggleFlip}
                closeModal={() => setIsOpen(false)}
                isFlipped={isFlipped}
              />
            </div>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
