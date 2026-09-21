"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  mousePosition: MousePosition;
  isMoving: boolean;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseInteractionProvider({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <MouseContext.Provider value={{ mousePosition, isMoving }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error("useMouse must be used within a MouseInteractionProvider");
  }
  return context;
}
