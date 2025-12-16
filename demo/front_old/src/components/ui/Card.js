import * as React from "react";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={`mt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
