import React from "react";

type Theme = "light" | "dark";

type Options = {
  disableTransitionOnChange?: boolean;
};

export function useTheme({ disableTransitionOnChange }: Options = {}) {
  const [theme, setTheme] = React.useState<Theme>(
    (window.localStorage.getItem("theme") as Theme) || "dark"
  );

  React.useEffect(() => {
    const enable = disableTransitionOnChange ? disableAnimation() : null;

    window.localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    enable?.();
  }, [theme]);

  return [theme, setTheme] as const;
}

/**
 * @see https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx#L285C33-L303C33
 */
const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

