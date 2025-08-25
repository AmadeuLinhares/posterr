import { Skeleton } from "@/components/ui/skeleton";

export const ProfileInfoSkeleton = () => {
  return (
    <div className="p-6 bg-slate-800 rounded-3xl grid gap-4">
      <div className="flex justify-start items-center gap-4">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-[50%] h-[20px]" />
      </div>
      <div className="grid gap-1">
        <div className="flex justify-start items-center gap-2">
          <Skeleton className="w-[50%] h-[20px]" />
          <Skeleton className="w-[50%] h-[20px]" />
        </div>
        <div className="flex justify-start items-center gap-2">
          <Skeleton className="w-[50%] h-[20px]" />
          <Skeleton className="w-[50%] h-[20px]" />
        </div>
        <div className="flex justify-start items-center gap-2">
          <Skeleton className="w-[50%] h-[20px]" />
          <Skeleton className="w-[50%] h-[20px]" />
        </div>
        <div className="flex justify-start items-center gap-2">
          <Skeleton className="w-[50%] h-[20px]" />
          <Skeleton className="w-[50%] h-[20px]" />
        </div>
      </div>
    </div>
  );
};
