import { PostCard } from "@/components/ui/post-card";
import { useFetchPots } from "../../queries/useFetchPots";

export const Feed = () => {
  const { data } = useFetchPots({ kind: "all" });

  console.log("data", data);

  return (
    <div>
      <div className="grid gap-4">
        {data?.map((current) => (
          <PostCard key={current.id} {...current} />
        ))}
      </div>
    </div>
  );
};
