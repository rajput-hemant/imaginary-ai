import { Link } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import { CreateImage } from "./create-image-dialog";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 border-b z-40 bg-background">
      <nav className="flex items-center container h-14">
        <Link to="/" className="mx-auto md:mx-0">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 rounded-full object-contain h-12 drop-shadow-sm"
          />
        </Link>

        <div className="md:flex flex-1 justify-end gap-4 hidden">
          <CreateImage />

          <Button
            size="sm"
            onClick={() =>
              toast({
                title: "Coming soon",
                description: "This feature is not available yet!",
              })
            }
            className="shadow-sm rounded-lg"
          >
            Create Video
          </Button>
        </div>
      </nav>
    </header>
  );
}

