import { Post } from "../../components/post";
import { useFetchPots } from "../../queries/useFetchPots";

export const Feed = () => {
  const { data } = useFetchPots({ kind: "all" });

  return (
    <div>
      <p>Feed</p>
      {data?.map((current) => (
        <Post {...current} />
      ))}
    </div>
  );
};
