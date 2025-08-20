import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { PostCard } from "@/components/ui/post-card";
import { useFetchProfile } from "@/queries/useFetchProfile";
import { useFetchUserPosts } from "@/queries/useFetchUserPosts";
import { HeartCrack } from "lucide-react";

export const Profile = () => {
  const { data } = useFetchProfile();
  const { data: posts } = useFetchUserPosts({ userId: data?.id });

  return (
    <div className="h-full w-full grid gap-6 ">
      {/*Header*/}
      <div className="p-6 bg-slate-800 rounded-3xl grid gap-4">
        <div className="flex justify-start items-center gap-4">
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage loading={"eager"} src={data?.avatar} />
          </Avatar>
          <p className="text-2xl text-secondary italic">{data?.userName}</p>
        </div>

        <div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-slate-400">Data joined:</p>
            <span className="text-slate-300">{data?.created_at}</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-slate-400">Followers: </p>
            <span className="text-slate-300">{data?.followers}</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-slate-400">Following: </p>
            <span className="text-slate-300">{data?.following}</span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-slate-400">Posts: </p>
            <span className="text-slate-300">{data?.posts_count}</span>
          </div>
        </div>
      </div>

      {/*Posts*/}
      <div>
        <div>
          {posts?.length ? (
            posts.map((current) => <PostCard key={current.id} {...current} />)
          ) : (
            <EmptyState
              content={<HeartCrack size={80} />}
              title="Oh no!! U never created a post in our plataform :("
            />
          )}
        </div>
      </div>
    </div>
  );
};
