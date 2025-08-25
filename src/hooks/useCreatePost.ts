import type { PostsResponse } from "@/queries/useFetchPots";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

interface PostUrlParams {
  parentId: string;
  isQuote: boolean;
  isPosting: boolean;
}

export const useCreatePost = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterInUrl = useCallback(
    (urlParams: PostUrlParams) => {
      const next = new URLSearchParams(searchParams);

      (Object.keys(urlParams) as (keyof PostUrlParams)[]).forEach((key) => {
        const value = urlParams[key];
        next.set(key, String(value));
      });

      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const handleRepost = useCallback(
    (data: PostsResponse) => () => {
      const body: PostUrlParams = {
        isQuote: false,
        parentId: data.id,
        isPosting: true,
      };

      setFilterInUrl(body);
    },
    [setFilterInUrl],
  );

  const handleQuote = useCallback(
    (data: PostsResponse) => () => {
      const body: PostUrlParams = {
        isQuote: true,
        parentId: data.id,
        isPosting: true,
      };
      setFilterInUrl(body);
    },
    [setFilterInUrl],
  );

  return { handleRepost, handleQuote };
};
