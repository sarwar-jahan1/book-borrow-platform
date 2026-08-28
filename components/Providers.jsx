"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#16241d",
            color: "#eeece2",
            fontFamily: "var(--font-sans)",
            border: "1px solid #a9793f",
          },
        }}
      />
    </>
  );
}
