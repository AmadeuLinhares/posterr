import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostSkeleton } from "@/pages/Feed/components/postSkeletonpostSkeleton/postSkeleton";
import { useFetchFollowing } from "@/queries/useFetchFollowing";
import {
  useFollowUnfollowUser,
  type FollowUnfollowUserRequest,
} from "@/queries/useFollowUnfollowUser";
import { Frown } from "lucide-react";
import { useCallback } from "react";

export const ProfileFollowers = () => {
  const { data, isLoading } = useFetchFollowing();
  const { mutate, isPending } = useFollowUnfollowUser();
  const handleFollowers = useCallback(
    (body: FollowUnfollowUserRequest) => () => {
      mutate(body);
    },
    [mutate],
  );
  return (
    <div>
      {isLoading || isPending ? (
        <PostSkeleton className=" bg-slate-500" />
      ) : (
        <div className="h-full">
          {data?.length ? (
            <ScrollArea className="h-[500px] w-full ">
              {data.map(({ avatar, id, userName }) => (
                <div
                  className="flex justify-between gap-4 items-center border p-4 rounded-xl mb-2"
                  key={id}
                >
                  <div className="flex justify-start items-center gap-2 borde">
                    <Avatar>
                      <AvatarImage sizes="xl" src={avatar} />
                    </Avatar>

                    <div>
                      <p className="text-base text-secondary">{userName}</p>
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={handleFollowers({
                        isFollow: false,
                        userId: id,
                      })}
                      variant={"destructive"}
                    >
                      Unfollow
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <EmptyState
              content={<Frown size={80} />}
              title="Oh no!! U are not following anyone :("
            />
          )}
        </div>
      )}
    </div>
  );
};
