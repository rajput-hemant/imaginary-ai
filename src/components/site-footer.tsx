import { Command, Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { Button } from "./ui/button";

export function SiteFooter() {
  const [theme, setTheme] = useTheme({ disableTransitionOnChange: true });

  function handleThemeChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <footer className="border-t">
      <div className="container h-14 flex items-center justify-between">
        <p className="text-sm flex items-center">
          <Command className="h-5 w-5 shrink-0 mr-2" /> Built by&nbsp;
          <a
            href="https://github.com/JitendraKumar1092"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @jeet
          </a>
          &nbsp; Hosted on&nbsp;
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </a>
          . The source code is available on&nbsp;
          <a
            href="https://github.com/JitendraKumar1092/Imaginary-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleThemeChange}
          className="hover:shadow-sm"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </div>
    </footer>
  );
}

