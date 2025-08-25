import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import { v7 } from "uuid";

interface PostSkeletonProps {
  className?: string;
}

export const PostSkeleton = ({ className = "" }: PostSkeletonProps) => {
  const fakeItems: string[] = Array(15)
    .fill(0)
    .map(() => v7());

  return (
    <div className="grid gap-4">
      {fakeItems.map((current) => (
        <div key={current}>
          <Skeleton
            className={clsx(
              "space-x-4 p-4 bg-secondary rounded-2xl h-[40px] w-full",
              className,
            )}
          />
        </div>
      ))}
    </div>
  );
};
