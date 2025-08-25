import { useQuery } from "@tanstack/react-query";
import {
  fetchUserPosts,
  type FetchUserPostsRequest,
} from "./useFetchUserPosts";
import { isToday } from "date-fns";

interface CheckCreatePostsAvailable {
  allowed: boolean;
}

export const useCheckCreatePostsAvailable = ({
  userId,
}: FetchUserPostsRequest) => {
  return useQuery<CheckCreatePostsAvailable>({
    queryKey: ["allowCreatePosts"],
    queryFn: async () => {
      const response = await fetchUserPosts({ userId });
      const postsToday = response?.filter((current) =>
        isToday(new Date(current.created_at)),
      );

      return {
        allowed: Boolean(!(postsToday.length > 5)),
      };
    },
    enabled: !!userId,
  });
};
