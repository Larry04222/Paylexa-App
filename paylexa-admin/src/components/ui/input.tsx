import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, id, ...props }, ref) => {
  const inputId = id ?? React.useId();

  return (
    <label className="flex flex-col gap-2 text-left text-sm text-brand-white/80" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border border-brand-white/20 bg-brand-black/60 px-4 text-sm text-brand-white placeholder:text-brand-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
          className,
        )}
        ref={ref}
        {...props}
      />
    </label>
  );
});
Input.displayName = "Input";
