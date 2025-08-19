import { useQuery } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";
import type { FollowingResponse } from "./useGetFollowing";

export interface PostsResponse {
  id: string;
  owner_id: string;
  created_at: string;
  avatar: string;
  parent_id?: string;
  isQuote: boolean;
  userName: string;
  content: string;
}

interface PostRequest {
  kind: "all" | "following";
}

export const useFetchPots = ({ kind }: PostRequest) => {
  return useQuery<PostsResponse[]>({
    queryKey: ["posts", kind],
    queryFn: async (): Promise<PostsResponse[]> => {
      const response = await fakeApiFetch<PostsResponse[]>("posts");

      if (!response) {
        const message = `Failed to fetch posts`;
        //TODO: Implement toast
        // toast.error(message);
        throw new Error(message);
      }

      if (kind === "all") return response;

      const following = await fakeApiFetch<FollowingResponse[]>("following");

      const ids = following?.map((current) => current.id);

      if (!!ids && ids.length) {
        return response.filter((current) => ids.includes(current.owner_id));
      }

      return [];
    },
  });
};
