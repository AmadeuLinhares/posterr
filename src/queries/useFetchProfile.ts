import { fakeApiFetch } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { FollowingResponse } from "./useFetchFollowing";
import { fetchUserPosts } from "./useFetchUserPosts";

export interface UserResponse {
  id: string;
  userName: string;
  avatar: string;
  created_at: string;
  followers: number;
  following: number;
  posts_count: number;
}

export const useFetchProfile = () => {
  return useQuery<UserResponse>({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserResponse> => {
      const response = await fakeApiFetch<UserResponse>("user");
      const following = await fakeApiFetch<FollowingResponse[]>("following");
      const posts = await fetchUserPosts({ userId: response?.id });

      if (!response) {
        const message = `Failed to profile information`;
        toast.error(message);
        throw new Error(message);
      }

      return {
        ...response,
        following: following?.length ?? 0,
        posts_count: posts.length,
      };
    },
  });
};
