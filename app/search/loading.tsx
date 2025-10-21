import { Skeleton } from "@/components/ui/skeleton";

export function WorkCardSkeleton() {
  return (
    <div className="flex gap-6 w-full h-56 text-black text-xs border-b-1 border-gray-400 p-4">
      <div className="min-w-32 max-w-32">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-12" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex gap-2 items-center mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="w-3xl flex flex-col gap-8">
      <div className="border-b border-gray-400 p-2">
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(10)].map((_, index) => (
          <WorkCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
