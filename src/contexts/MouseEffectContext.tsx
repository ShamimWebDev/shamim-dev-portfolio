import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface MouseEffectContextType {
  isEnabled: boolean;
  toggle: () => void;
}

const MouseEffectContext = createContext<MouseEffectContextType | undefined>(
  undefined
);

export const MouseEffectProvider = ({ children }: { children: ReactNode }) => {
  // Default to false ("simple" mode) as requested
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle = () => setIsEnabled((prev) => !prev);

  return (
    <MouseEffectContext.Provider value={{ isEnabled, toggle }}>
      {children}
    </MouseEffectContext.Provider>
  );
};

export const useMouseEffect = () => {
  const context = useContext(MouseEffectContext);
  if (!context)
    throw new Error("useMouseEffect must be used within a MouseEffectProvider");
  return context;
};
