import React from "react";

export default function Underline({ children, tailwindClasses = "" }) {
  return (
    <span className={`underline underline-offset-2 ${tailwindClasses}`}>
      {children}
    </span>
  );
}
