import { useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/responsive";
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
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const updateHeight = useCallback(() => {
    if (isOpen && signUpRef.current) {
      // p-6: 24px / 16 = 3rem
      // p-3: 12px / 16 = 1.5rem
      const pixelsToRem = (pixels: number) => pixels / 16;

      const remPadding = isLargeScreen ? 3 : 1.5;

      const remHeight =
        pixelsToRem(signUpRef.current.offsetHeight) + remPadding;

      onHeightChange?.(remHeight);
    }
  }, [isOpen, onHeightChange, isLargeScreen]);

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
