import React from "react";
import { Image, Loader2, Shapes } from "lucide-react";

import { cn, getRandomPrompts } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CreateImage() {
  const [isLoading, setIsLoading] = React.useState({
    imageGeneration: false,
    sharingWithCommunity: false,
  });
  const [form, setform] = React.useState({
    name: "",
    prompt: "",
  });
  const [imageSrc, setImageSrc] = React.useState("");

  /**
   * @param {React.FormHTMLAttributes<HTMLFormElement>.action}
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.prompt) {
      alert("Please fill all the fields");
      return;
    }

    setIsLoading({ ...isLoading, imageGeneration: true });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_IMAGINARY_API_KEY}/api/v1/imaginary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        }
      );

      const data = await response.json();

      setImageSrc(data.photo[0]);
    } catch (error) {
      console.log(error);
      alert(error);
    }

    setIsLoading({ ...isLoading, imageGeneration: false });
  }

  async function shareWithCommunity() {
    if (!imageSrc || !form.prompt) {
      alert("Please generate an image first");
      return;
    }

    setIsLoading({ ...isLoading, sharingWithCommunity: true });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_IMAGINARY_API_KEY}/api/v1/post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, image: imageSrc }),
        }
      );

      await response.json();
    } catch (error) {
      console.log(error);
      alert(error);
    }

    setIsLoading({ ...isLoading, sharingWithCommunity: false });
  }

  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompts();
    setform({ ...form, prompt: randomPrompt });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="md:hidden shadow">Create Image</Button>

          <Button
            size="sm"
            variant="outline"
            className="hidden shadow md:inline-flex"
          >
            Create Image
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-6xl p-10 !rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl tracking-wide font-bold text-center [text-shadow:_0_4px_0_#e1e1e1] dark:bg-gradient-to-br dark:from-foreground dark:to-gray-500 dark:bg-clip-text dark:text-transparent dark:[text-shadow:none] md:text-3xl lg:text-4xl xl:text-5xl">
            Create
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            Create imaginative and visually stunning images through Imaginary
            and share them with the Community.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex gap-4 md:gap-10 mt-10 flex-col-reverse md:flex-row"
        >
          <div className="w-full space-y-2 md:mt-auto">
            <div className="space-y-1">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setform({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="prompt">Prompt</Label>
              <div className="flex gap-2 justify-center items-center">
                <Input
                  id="prompt"
                  placeholder="Enter prompt"
                  value={form.prompt}
                  onChange={(e) => setform({ ...form, prompt: e.target.value })}
                />

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSurpriseMe}
                >
                  Suprise Me
                </Button>
              </div>
            </div>

            <DialogFooter className="pt-10 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={shareWithCommunity}
                className="w-56"
              >
                {isLoading.sharingWithCommunity ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <Shapes className="mr-2 h-5 w-5" />
                    Share With Community
                  </>
                )}
              </Button>

              <Button type="submit" className="w-32">
                {isLoading.imageGeneration ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <Image className="mr-2 h-5 w-5" />
                    Generate
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>

          <div className="aspect-square overflow-hidden p-0.5 relative border-2 rounded-xl border-dashed bg-muted max-w-sm md:max-w-none mx-auto md:w-[40rem]">
            {isLoading.imageGeneration ? (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur bg-background/50 rounded-xl">
                <Loader2
                  size={44}
                  className="animate-spin text-muted-foreground m-auto"
                />
              </div>
            ) : (
              <img
                src={!imageSrc ? "/image-placeholder.png" : imageSrc}
                alt={!imageSrc ? "Image placeholder" : form.prompt}
                className={cn(
                  "dark:invert object-contain rounded-lg",
                  !imageSrc && "w-72 m-auto h-full"
                )}
              />
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

