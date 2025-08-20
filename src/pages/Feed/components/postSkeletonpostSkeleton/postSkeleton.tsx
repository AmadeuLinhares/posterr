import { Skeleton } from "@/components/ui/skeleton";
import { v7 } from "uuid";

export const PostSkeleton = () => {
  const fakeItems: string[] = Array(15)
    .fill(0)
    .map(() => v7());

  return (
    <div className="grid gap-4">
      {fakeItems.map((current) => (
        <div
          key={current}
          className="space-x-4 p-4 bg-secondary rounded-2xl gap-2"
        >
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
};
