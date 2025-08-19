import { useQuery } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";

export interface FollowingResponse {
  id: string;
  userName: string;
  avatar: string;
  created_at: string;
  followers: number;
  following: number;
  posts_count: number;
}

export const useGetFollowing = () => {
  return useQuery<FollowingResponse[]>({
    queryKey: ["following"],
    queryFn: async (): Promise<FollowingResponse[]> => {
      const response = await fakeApiFetch<FollowingResponse[]>("following");

      if (!response) {
        const message = `Failed to fetch posts`;
        //TODO: Implement toast
        // toast.error(message);
        throw new Error(message);
      }

      return response;
    },
  });
};
