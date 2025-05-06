"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./login/component";
import Signup from "./signup/component";

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // const [containerHeight, setContainerHeight] = useState(0);
  // const loginRef = useRef<HTMLDivElement>(null);
  // const signupRef = useRef<HTMLDivElement>(null);

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
              <div className="relative w-full h-[28rem] perspective-1000">
                <div
                  className={`w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
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
                    <Signup setIsFlipped={setIsFlipped} />
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
