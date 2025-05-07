import { useCallback, useEffect, useRef } from "react";
import { Form } from "./Form";

type SignupProps = {
  setIsFlipped: (value: boolean) => void;
  isOpen: boolean;
  isFlipped: boolean;
  onHeightChange?: (height: number) => void;
};

export default function Signup({
  setIsFlipped,
  isOpen,
  isFlipped,
  onHeightChange,
}: SignupProps) {
  const signUpRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const updateHeight = useCallback(() => {
    if (isOpen && signUpRef.current) {
      // Height of the signup form + 48px (padding)
      const height = signUpRef.current.offsetHeight + 48;
      onHeightChange?.(height);
    }
  }, [isOpen, onHeightChange]);

  useEffect(() => {
    if (isOpen && isFlipped && signUpRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserverRef.current.observe(signUpRef.current);

      updateHeight();

      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }
  }, [isFlipped, isOpen, updateHeight]);

  const handleFlip = () => {
    setIsFlipped(false);
  };

  return (
    <div ref={signUpRef}>
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
