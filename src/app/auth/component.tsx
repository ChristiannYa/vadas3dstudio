"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./log-in/component";
import Signup from "./sign-up/component";

export function LoginForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const [signUpHeight, setSignUpHeight] = useState<number>(0);

  const handleSignupHeightChange = useCallback((height: number) => {
    setSignUpHeight(height);
  }, []);

  const containerHeight = Math.max(signUpHeight, 16 * 32);

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
                style={{ minHeight: `${containerHeight}px` }}
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
