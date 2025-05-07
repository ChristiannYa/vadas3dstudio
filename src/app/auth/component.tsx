"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/responsive";
import Login from "./log-in/component";
import Signup from "./sign-up/component";

/*
  To do:
    - Find a way to obtain in the class values of the form
      components to avoid manual calculation 
*/
export function LoginForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const [signUpHeight, setSignUpHeight] = useState<number>(0);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleSignupHeightChange = useCallback((height: number) => {
    setSignUpHeight(height);
  }, []);

  /*
    The height on small screens is obtained by
      * There are 5 labels

      .form - py
      - py of the form on large screens 24 (2)  = 48
      - py of the form on small screens 12 (2) = 24
      - py - to be substracted = 24
      - why? because we are subtracting the vertical padding
        24 = total padding to remove
      
      .form__title - mb
      - mb of the form title on large screens 12
      - mb of the form title on small screens 4
      - to be substracted = 8

      .form__input - py
      - py of input fields on large screens 4 (2) = 8
      - py of input fields on small screens 1 (2) = 2
      - to be substracted = 10
      - why? because we are substracting the vertical padding from
        the input fields. There are 5 input fields. So, 
        (5 inputs) * (vertical padding) = (5) * (2) 
        5 * 2 = 10 
        10 = total padding to remove
      
      .form__labels - space-y
      - space-y between form labels on large screens 12
      - space-y between form labels on small screens 8
      - to be substracted = 32
      - why? because there are 4 gaps in beteween the 5 form fields.
        So, (4 gaps) * (space-y) = (4) * (8)
        4 * 8 = 32
        32 = total padding to remove

      .form__label - mb
      - mb of the form label on large screens 8
      - mb of the form label on small screens 4
      - to be substracted = 20
      - why? because there are 5 form labels.
        So, (5 labels) * (mb) = (5) * (4)
        5 * 4 = 20
        20 = total padding to remove

      - Total = 512 - (24 + 8 + 10 + 32 + 20) = 418
        512 / 16 = 32
        418 / 16 = 26
  */
  const minHeight = isLargeScreen ? 32 : 26;
  const containerHeight = Math.max(signUpHeight, minHeight);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`nav__item a`}>
        Login
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-black/50 dark:bg-bg/50 no-doc-scroll inset-0 h-dvh w-screen fixed top-0 left-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-black/20 dark:bg-white/20 backdrop-blur-lg rounded-lg overflow-hidden w-[300px] md:w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full perspective-1000`}
                style={{ minHeight: `${containerHeight}rem` }}
              >
                <div
                  className={`transition-all duration-700 [transform-style:preserve-3d] w-full h-full ${
                    isFlipped ? "[transform:rotateY(-180deg)]" : ""
                  }`}
                >
                  {/* Login Form - Front */}
                  <div
                    className={`form ${
                      isFlipped
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <Login setIsFlipped={setIsFlipped} />
                  </div>

                  {/* Signup Form - Back */}
                  <div
                    className={`form [transform:rotateY(-180deg)] ${
                      isFlipped
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Signup
                      setIsFlipped={setIsFlipped}
                      isOpen={isOpen}
                      isFlipped={isFlipped}
                      onHeightChange={handleSignupHeightChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
