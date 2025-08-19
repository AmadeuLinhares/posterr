import type { PostsResponse } from "../../queries/useFetchPots";

export const Post = ({ userName }: PostsResponse) => {
  return (
    <div>
      <p>{userName}</p>
    </div>
  );
};
