import { useQuery } from "@tanstack/react-query";
import { fakeApiFetch } from "../api";
import { toast } from "sonner";

export const useFetchFollowing = () => {
  return useQuery<string[]>({
    queryKey: ["following"],
    queryFn: async (): Promise<string[]> => {
      const response = await fakeApiFetch<string[]>("following");

      if (!response) {
        const message = `Failed to fetch following list`;
        //TODO: Implement toast
        toast.error(message);
        throw new Error(message);
      }

      return response;
    },
  });
};
