import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type FormContext = {
  isGoogleLoading: boolean;
  setIsGoogleLoading: Dispatch<SetStateAction<boolean>>;
};

export const FormContext = createContext<FormContext>({
  isGoogleLoading: false,
  setIsGoogleLoading: () => {},
});

export function FormProvider({ children }: { children: ReactNode }) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  return (
    <FormContext.Provider value={{ isGoogleLoading, setIsGoogleLoading }}>
      {children}
    </FormContext.Provider>
  );
}
