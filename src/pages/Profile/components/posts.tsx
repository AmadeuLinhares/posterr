import { EmptyState } from "@/components/ui/empty-state";
import { PostCard } from "@/components/ui/post-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostSkeleton } from "@/pages/Feed/components/postSkeletonpostSkeleton/postSkeleton";
import { useFetchUserPosts } from "@/queries/useFetchUserPosts";
import { HeartCrack } from "lucide-react";
interface ProfilePostsProps {
  userId?: string;
}

export const ProfilePosts = ({ userId }: ProfilePostsProps) => {
  const { data: posts, isLoading, isFetching } = useFetchUserPosts({ userId });
  return (
    <div>
      {isLoading || isFetching ? (
        <PostSkeleton className=" bg-slate-500" />
      ) : (
        <div>
          {posts?.length ? (
            <ScrollArea className="h-[450px]">
              {posts.map((current) => (
                <div key={current.id} className="mb-4">
                  <PostCard hideFollowActions={true} {...current} />
                </div>
              ))}
            </ScrollArea>
          ) : (
            <EmptyState
              content={<HeartCrack size={80} />}
              title="Oh no!! U never created a post in our plataform :("
            />
          )}
        </div>
      )}
    </div>
  );
};
