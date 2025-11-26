import React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group "
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",

        // 🟢 SUCCESS
        "--success-bg": "#22c55e", // bg-green-500
        "--success-text": "white",
        "--success-div": "flex-line",
        "--success-border": "#16a34a", // green-600

        // 🔴 ERROR
        "--error-bg": "#ef4444", // bg-red-500
        "--error-text": "white",
        "--error-border": "#dc2626", // red-600
      }}
      {...props}
    />
  );
};

export { Toaster };
