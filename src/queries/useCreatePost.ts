import { fakeApiFetch, fakeApiSave } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostsResponse } from "./useFetchPots";
import { toast } from "sonner";

interface CreatePostRequest {
  owner_id: string;
  avatar: string;
  parent_id: string | null;
  isQuote: boolean;
  userName: string;
  content?: string;
  id: string;
  created_at: string;
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreatePostRequest>({
    mutationFn: async (body) => {
      const posts = (await fakeApiFetch<PostsResponse[]>("posts")) ?? [];

      await fakeApiSave("posts", [body, ...posts]);
    },
    onSuccess: () => {
      toast.success("Post created :)");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Error when we try to create your post :(. Try again later.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
