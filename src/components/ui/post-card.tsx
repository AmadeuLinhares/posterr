import { useCallback, useMemo } from "react";
import type { PostsResponse } from "../../queries/useFetchPots";
import { Avatar, AvatarImage } from "./avatar";
import { RotateCw, MessageSquareQuote, RedoDot } from "lucide-react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useFollowUnfollowUser } from "@/queries/useFollowUnfollowUser";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "@/queries/useFetchProfile";
import { formatUserName } from "@/utils/formatUserName";
import { displayFormatDate } from "@/utils/displayFormatDate";

interface PostCardProps extends PostsResponse {
  hideFollowActions?: boolean;
}

export const PostCard = (props: PostCardProps) => {
  const {
    userName,
    avatar,
    content,
    created_at,
    isQuote,
    parent_id,
    parent,
    isFollowing,
    owner_id,
    hideFollowActions,
  } = props;
  const queryClient = useQueryClient();
  const { mutate } = useFollowUnfollowUser();
  const { handleQuote, handleRepost } = useCreatePost();
  const userData = queryClient.getQueryData<UserResponse>(["profile"]);

  const handleFollowers = useCallback(() => {
    mutate({
      isFollow: !isFollowing,
      userId: owner_id,
    });
  }, [isFollowing, mutate, owner_id]);

  const isRepost = useMemo(
    () => !!parent_id && !isQuote && parent?.length,
    [isQuote, parent?.length, parent_id],
  );
  const isQuotePost = useMemo(
    () => !!parent_id && isQuote && parent?.length,
    [isQuote, parent?.length, parent_id],
  );

  const repost = useMemo(() => {
    if (!isRepost) return null;
    return (
      <div className="flex justify-start items-center gap-1">
        <div>
          <RotateCw className="text-green-800" size={"1rem"} />
        </div>
        <div>
          <p className="text-gray-700">
            <span className="text-primary">{userName}</span> reposted
          </p>
        </div>
      </div>
    );
  }, [isRepost, userName]);

  const profileImg = useMemo(
    () => (isRepost ? parent[0].avatar : avatar),
    [avatar, isRepost, parent],
  );
  const author = useMemo(
    () =>
      isRepost ? formatUserName(parent[0].userName) : formatUserName(userName),
    [isRepost, parent, userName],
  );
  const created = useMemo(
    () => (isRepost ? parent[0].created_at : created_at),
    [created_at, isRepost, parent],
  );
  const post = useMemo(
    () => (isRepost ? parent[0].content : content),
    [content, isRepost, parent],
  );

  const quote = useMemo(() => {
    if (!isQuotePost) return null;
    return (
      <div className="ml-4">
        <PostCard hideFollowActions={hideFollowActions} {...parent[0]} />
      </div>
    );
  }, [isQuotePost, hideFollowActions, parent]);

  const followActions = useMemo(() => {
    if (userData?.id === owner_id || hideFollowActions) return null;

    if (isFollowing) {
      return (
        <Button onClick={handleFollowers} variant={"destructive"}>
          Unfollow
        </Button>
      );
    }

    return (
      <Button onClick={handleFollowers} variant={"default"}>
        Follow
      </Button>
    );
  }, [handleFollowers, hideFollowActions, isFollowing, owner_id, userData?.id]);

  return (
    <div className="p-4 bg-secondary rounded-2xl grid gap-2">
      {repost}
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <Avatar>
            <AvatarImage sizes="xl" src={profileImg} />
          </Avatar>

          <div>
            <p className="text-base text-primary">{author}</p>
            <p className="text-sm text-secondary-foreground">
              {displayFormatDate(created)}
            </p>
          </div>
        </div>
        <div>{followActions}</div>
      </div>

      <div>
        <p>{post}</p>
      </div>

      {userData?.id !== owner_id && (
        <div className="flex justify-start items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={handleQuote(props)}>
                <MessageSquareQuote />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quote</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={handleRepost(props)}>
                <RedoDot />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Repost</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {quote}
    </div>
  );
};
