"use client";

import { useEffect, useRef, useState } from "react";
import { FormProvider } from "@/contexts/FormContext";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/auth";
import LogInFace from "./log-in/LogInFace";
import SignupFace from "./signup/SignupFace";
import LogoutButton from "../account/LogoutButton";

export function LoginForm() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClick = () => {
    if (user?.isLoggedIn) {
      router.push("/account");
    } else {
      setIsOpen(true);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {loading ? (
        <div className="px-2 py-1 flex items-center justify-center">
          <span className="inline-block w-3.5 h-3.5 border-2 border-t-transparent border-black dark:border-white rounded-full animate-spin"></span>
        </div>
      ) : user?.isLoggedIn ? (
        <div
          ref={dropdownRef}
          className={`dropdown ${isDropdownActive ? "active" : ""}`}
        >
          <div
            onClick={toggleDropdown}
            className={`nav__item dropbtn ${
              pathname.startsWith("/account") ? "active" : ""
            }`}
          >
            Account
          </div>
          <div className="dropdown-content font-dm-sans min-w-[150px] pt-1 lg:pt-3.5 flex flex-col absolute right-0 max-md:-left-1/2 z-[1]">
            <button
              onClick={handleButtonClick}
              className="bg-accent-1 hover:bg-accent-1-hover text-black-fg cursor-pointer w-full py-2"
            >
              <p>Orders</p>
            </button>
            <LogoutButton className="bg-white hover:bg-neutral-100/95 dark:bg-white-fg dark:hover:bg-neutral-300 text-black-fg cursor-pointer w-full py-2" />
          </div>
        </div>
      ) : (
        <button onClick={handleButtonClick} className="nav__item">
          <p>Login</p>
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
