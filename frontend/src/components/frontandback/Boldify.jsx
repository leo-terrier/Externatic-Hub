import React from "react";

export default function Boldify({ children, tailwindClasses }) {
  return <span className={`font-bold ${tailwindClasses}`}>{children}</span>;
}
