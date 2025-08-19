import { useQuery } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";
import { toast } from "sonner";

export interface PostsResponse {
  id: string;
  owner_id: string;
  created_at: string;
  avatar: string;
  parent_id?: string;
  isQuote: boolean;
  userName: string;
  content: string;
  parent: Omit<PostsResponse, "children">[];
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
        toast.error(message);
        throw new Error(message);
      }

      const formatted = response.map((current) => ({
        ...current,
        parent: response.filter((child) => child.id === current.parent_id),
      }));

      if (kind === "all") return formatted;

      const ids = await fakeApiFetch<string[]>("following");

      if (!!ids && ids.length) {
        return response.filter((current) => ids.includes(current.owner_id));
      }

      return [];
    },
  });
};
