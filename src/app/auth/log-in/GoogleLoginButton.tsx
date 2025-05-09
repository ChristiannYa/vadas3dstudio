"use client";

import { useContext } from "react";
import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { FormContext } from "@/contexts/FormContext";
import { GoogleIcon } from "@/app/assets/icons/page";
import Button from "@/app/components/page/Button";

export function GoogleLoginButton() {
  const { pending } = useFormStatus();
  const { isGoogleLoading, setIsGoogleLoading } = useContext(FormContext);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      disabled={pending || isGoogleLoading}
      className="border-gray-300 bg-white before:bg-neutral-300 hover:cursor-pointer flex items-center justify-center w-full"
    >
      {isGoogleLoading ? (
        <p className="form__submit-btn__p">Loading...</p>
      ) : (
        <div className="flex items-center gap-x-1">
          <GoogleIcon className="w-4 h-4" />
          <p className="form__submit-btn__p">Continue with Google</p>
        </div>
      )}
    </Button>
  );
}
