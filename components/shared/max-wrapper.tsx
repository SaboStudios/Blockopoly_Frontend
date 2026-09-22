import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWrapperProps {
  children: ReactNode;
  className?: string;
}

const MaxWrapper = ({ children, className }: MaxWrapperProps) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4", className)}>
      {children}
    </div>
  );
};

export default MaxWrapper;
