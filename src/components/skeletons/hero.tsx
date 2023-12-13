import { Skeleton } from "../ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 w-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <figure key={i} className="space-y-4 w-full">
          <Skeleton className="w-full h-44" />

          <figcaption className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />

            <Skeleton className="rounded-full w-full h-8" />
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

