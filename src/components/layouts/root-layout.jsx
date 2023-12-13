import { Outlet } from "react-router-dom";

import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { TailwindIndicator } from "../tailwind-indicator";
import { Toaster } from "../ui/toaster";
import { TooltipProvider } from "../ui/tooltip";

export function RootLayout() {
  return (
    <div className="min-h-screen scroll-smooth antialiased font-sans selection:bg-foreground selection:text-background">
      {/* providers */}
      <TooltipProvider>
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </TooltipProvider>

      <Toaster />

      <TailwindIndicator />
    </div>
  );
}

