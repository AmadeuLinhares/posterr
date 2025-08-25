import { fakeApiFetch, fakeApiSave } from "@/api";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type { FollowingResponse } from "./useFetchFollowing";
import { toast } from "sonner";
import type { FetchPosts } from "./useFetchPots";

export interface FollowUnfollowUserRequest {
  isFollow: boolean;
  userId: string;
}

export const useFollowUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, FollowUnfollowUserRequest>({
    mutationFn: async ({ isFollow, userId }) => {
      const followingList =
        (await fakeApiFetch<FollowingResponse[]>("following")) ?? [];

      if (!isFollow) {
        const updatedList = followingList?.filter(
          (current) => current.id !== userId,
        );
        return await fakeApiSave("following", updatedList);
      }

      const users = await fakeApiFetch<FollowingResponse[]>("users");

      const findUser = users?.find((current) => current.id === userId);

      if (!findUser) {
        const message = `Failed to ${isFollow ? "follow" : "unfollow"} user`;
        toast.error(message);
        throw new Error(message);
      }

      await fakeApiSave("following", [findUser, ...followingList]);
    },
    onMutate: ({ isFollow, userId }) => {
      //  (optimistic update / optimistic UI).

      queryClient.setQueryData<FollowingResponse[]>(["following"], (old) => {
        if (!old) return old;
        return old.filter((current) => current.id !== userId);
      });

      queryClient.setQueryData<InfiniteData<FetchPosts>>(
        ["posts", "all"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((current) => {
              return {
                ...current,
                posts: current.posts.map((value) => {
                  return {
                    ...value,
                    isFollowing:
                      value.owner_id === userId ? isFollow : value.isFollowing,
                    parent: value.parent.map((parent) => ({
                      ...parent,
                      isFollowing:
                        parent.owner_id === userId
                          ? isFollow
                          : parent.isFollowing,
                    })),
                  };
                }),
              };
            }),
          };
        },
      );

      queryClient.setQueryData<InfiniteData<FetchPosts>>(
        ["posts", "following"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((current) => {
              return {
                ...current,
                posts: current.posts.map((value) => {
                  return {
                    ...value,
                    isFollowing:
                      value.owner_id === userId ? isFollow : value.isFollowing,
                    parent: value.parent.map((parent) => ({
                      ...parent,
                      isFollowing:
                        parent.owner_id === userId
                          ? isFollow
                          : parent.isFollowing,
                    })),
                  };
                }),
              };
            }),
          };
        },
      );
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (_, { isFollow }) => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      const message = `Failed to ${isFollow ? "follow" : "unfollow"} user`;
      toast.error(message);
      throw new Error(message);
    },
  });
};
