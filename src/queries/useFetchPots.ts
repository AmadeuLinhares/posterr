import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";

export interface PostsResponse {
  id: string;
  owner_id: string;
  created_at: string;
  avatar: string;
  parent_id?: string;
  isQuote: boolean;
  userName: string;
  content: string;
  parent: PostsResponse[];
}

interface PostRequest {
  kind: "all" | "following";
  page: number;
}

interface FetchPosts {
  page: number;
  totalPages: number;
  posts: PostsResponse[];
}

const PAGINATION = 10;

const fetchPosts = async ({ kind, page }: PostRequest): Promise<FetchPosts> => {
  const response = await fakeApiFetch<PostsResponse[]>("posts");

  const emptyResponse = {
    page: 1,
    totalPages: 1,
    posts: [],
  };

  if (!response?.length) return emptyResponse;

  if (kind === "all") {
    const totalPages = Math.round(response?.length ?? 0 / PAGINATION);

    const paginated =
      response?.slice((page - 1) * PAGINATION, page * PAGINATION) ?? [];

    const formatted = paginated.map((current) => ({
      ...current,
      parent: response?.filter((child) => child.id === current.parent_id),
    }));

    return {
      page,
      totalPages,
      posts: formatted,
    };
  }

  const ids = await fakeApiFetch<string[]>("following");

  if (!ids?.length) return emptyResponse;

  const followedUsers = response.filter((current) =>
    ids.includes(current.owner_id),
  );

  const totalPages = Math.round(followedUsers?.length ?? 0 / PAGINATION);

  const paginated =
    followedUsers?.slice((page - 1) * PAGINATION, page * PAGINATION) ?? [];

  const formatted = paginated.map((current) => ({
    ...current,
    parent: response?.filter((child) => child.id === current.parent_id),
  }));

  return {
    page,
    totalPages,
    posts: formatted,
  };
};

export const useFetchPots = ({ kind }: Pick<PostRequest, "kind">) => {
  return useInfiniteQuery<
    FetchPosts, // TQueryFnData (API retorna isso)
    Error, // TError
    InfiniteData<FetchPosts>, // TData (mesmo, porque não tem select)
    ["posts", string], // TQueryKey
    number // TPageParam
  >({
    queryKey: ["posts", kind],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ kind, page: pageParam }),
    initialPageParam: 1,

    // Calculate next page
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1; // next page
      }
      return undefined; // already fetched all pages
    },

    // Calculate previous page
    getPreviousPageParam: (firstPage) => {
      if (firstPage.page > 1) {
        return firstPage.page - 1;
      }
      return undefined;
    },
  });
};
