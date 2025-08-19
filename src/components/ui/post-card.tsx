import { useMemo } from "react";
import type { PostsResponse } from "../../queries/useFetchPots";
import { Avatar, AvatarImage } from "./avatar";
import { RotateCw } from "lucide-react";

export const PostCard = ({
  userName,
  avatar,
  content,
  created_at,
  id,
  isQuote,
  owner_id,
  parent_id,
  parent,
}: PostsResponse) => {
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
    () => (isRepost ? parent[0].userName : userName),
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
        <PostCard {...parent[0]} />
      </div>
    );
  }, [parent, isQuotePost]);

  return (
    <div className="p-4 bg-secondary rounded-2xl grid gap-2">
      {repost}
      <div className="flex justify-start items-center gap-2">
        <Avatar>
          <AvatarImage sizes="xl" src={profileImg} />
        </Avatar>

        <div>
          <p className="text-base text-primary">{author}</p>
          <p className="text-sm text-secondary-foreground">{created}</p>
        </div>
      </div>

      <div>
        <p>{post}</p>
      </div>
      {quote}
    </div>
  );
};
