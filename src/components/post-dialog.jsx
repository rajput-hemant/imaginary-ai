import React from "react";
import {
  Check,
  Clipboard,
  ClipboardCheck,
  Download,
  Heart,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { cn, getCrypto } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.prompt
 * @param {string} props.photo
 * @param {React.ReactNode} props.children
 */
export function PostDialog({ name, prompt, photo, children }) {
  const [liked, setLiked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  function toggleLike() {
    setLiked(!liked);

    toast({
      description: "This feature is not yet implemented.",
    });
  }

  function copyPrompt() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);

    toast({
      title: (
        <>
          <Check className="inline-block mr-2 h-5 w-5 text-green-500" /> Copied!
        </>
      ),
      description: "The prompt has been copied to your clipboard.",
      action: (
        <ToastAction altText="Create" asChild>
          <Link to="/create">Create</Link>
        </ToastAction>
      ),
    });
  }

  async function downloadImage() {
    try {
      const res = await fetch(photo);
      const buffer = await res.arrayBuffer();

      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `imaginary-ai-${getCrypto().randomUUID()}.png`
      );
      document.body.appendChild(link);
      link.click();

      toast({
        title: (
          <>
            <Check className="inline-block mr-2 h-5 w-5 text-green-500" />{" "}
            Downloaded!
          </>
        ),
        description: "The image has been downloaded to your device.",
        action: (
          <ToastAction altText="Create" asChild>
            <Link to="/create">Create</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "An error occurred while downloading the image.",
      });
    }
  }

  function shareImage() {
    toast({
      description: "This feature is not yet implemented.",
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="h-44">{children}</DialogTrigger>

      <DialogContent>
        <div className="rounded-lg shadow border hover:shadow-lg p-0.5 w-full mt-4">
          <img src={photo} className="object-cover aspect-square rounded-lg" />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg">
            By{" "}
            <span className="underline underline-offset-4 cursor-pointer">
              {name}
            </span>
          </p>

          <div className="flex">
            <Button
              title={liked ? "Unlike" : "Like"}
              size="icon"
              variant="ghost"
              onClick={toggleLike}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-foreground")} />
            </Button>
            <Button
              title={copied ? "Copied!" : "Copy prompt"}
              size="icon"
              variant="ghost"
              onClick={copyPrompt}
            >
              {copied ? (
                <ClipboardCheck className="h-5 w-5" />
              ) : (
                <Clipboard className="h-5 w-5" />
              )}
            </Button>
            <Button size="icon" variant="ghost" onClick={downloadImage}>
              <Download className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={shareImage}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <p className="font-medium">
          Prompt: <span className="font-normal text-sm">{prompt}</span>
        </p>
      </DialogContent>
    </Dialog>
  );
}

