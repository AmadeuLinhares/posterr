import { useQuery } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";
import { toast } from "sonner";

export interface FollowingResponse {
  id: string;
  userName: string;
  avatar: string;
}

export const useFetchFollowing = () => {
  return useQuery<FollowingResponse[]>({
    queryKey: ["following"],
    queryFn: async (): Promise<FollowingResponse[]> => {
      const response = await fakeApiFetch<FollowingResponse[]>("following");

      if (!response) {
        const message = `Failed to fetch following list`;
        toast.error(message);
        throw new Error(message);
      }

      return response;
    },
  });
};
