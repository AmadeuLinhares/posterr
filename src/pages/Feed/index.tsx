import { PostCard } from "@/components/ui/post-card";
import { useFetchPots } from "../../queries/useFetchPots";
import { useCallback, useMemo } from "react";
import { InView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { PostSkeleton } from "./components/postSkeletonpostSkeleton/postSkeleton";
import { Filter } from "./components/filter/filter";
import { useSearchParams } from "react-router";
import { filterSchema } from "./components/filter/schemas";
import { EmptyState } from "@/components/ui/empty-state";
import { Frown } from "lucide-react";

export const Feed = () => {
  const [searchParams] = useSearchParams();

  const { filters } = filterSchema.parse(Object.fromEntries(searchParams));

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useFetchPots({ kind: filters });

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const posts = useMemo(
    () => data?.pages.flatMap((p) => p.posts) ?? [],
    [data],
  );

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className="grid gap-4">
      <Filter />
      <div className="grid gap-4  h-full">
        {posts.length ? (
          posts.map((current) => <PostCard key={current.id} {...current} />)
        ) : (
          <EmptyState
            content={<Frown size={80} />}
            title="Oh no!! No posts available"
            description="Try to follow more users or post in your feed to be able to see some posts here"
          />
        )}

        {/* Sentinela */}
        {hasNextPage && (
          <InView onChange={handleInView} rootMargin="100px">
            {({ ref }) => (
              <div ref={ref} className="flex justify-center items-center p-4">
                {isFetchingNextPage && <Spinner />}
              </div>
            )}
          </InView>
        )}
      </div>
    </div>
  );
};
