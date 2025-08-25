import { useQuery } from "@tanstack/react-query";
import type { PostsResponse } from "./useFetchPots";
import { fakeApiFetch } from "@/api";

export interface FetchUserPostsRequest {
  userId?: string;
}

export const fetchUserPosts = async ({ userId }: FetchUserPostsRequest) => {
  const response = await fakeApiFetch<Promise<PostsResponse[]>>("posts");

  if (!response) return [];

  const userPosts = response?.filter((current) => current.owner_id === userId);

  const formatted = userPosts?.map((current) => ({
    ...current,
    parent: response?.filter((child) => child.id === current.parent_id),
  }));

  return formatted;
};

export const useFetchUserPosts = ({ userId }: FetchUserPostsRequest) => {
  return useQuery<PostsResponse[]>({
    queryKey: ["profile", "posts", userId],
    queryFn: () => fetchUserPosts({ userId }),
    enabled: !!userId,
  });
};
