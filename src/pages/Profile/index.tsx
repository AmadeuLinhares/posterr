import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchProfile } from "@/queries/useFetchProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePosts } from "./components/posts";
import { ProfileFollowers } from "./components/followers";
import { formatUserName } from "@/utils/formatUserName";
import { displayFormatDate } from "@/utils/displayFormatDate";
import { ProfileInfoSkeleton } from "./components/profileInfoSkeleton";
import { CreatePost } from "@/components/ui/create-post";

export const Profile = () => {
  const { data, isFetching, isLoading } = useFetchProfile();

  return (
    <div className="h-full w-full grid gap-6 ">
      {(isFetching || isLoading) && <ProfileInfoSkeleton />}

      {/*Header*/}

      {!isFetching && !isLoading && (
        <div className="p-6 bg-slate-800 rounded-3xl grid gap-4">
          <div className="flex justify-start items-center gap-4">
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage loading={"eager"} src={data?.avatar} />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <p className="text-2xl text-secondary italic">
              {formatUserName(data?.userName)}
            </p>
          </div>

          <div>
            <div className="flex justify-start items-center gap-2">
              <p className="text-slate-400">Data joined:</p>
              <span className="text-slate-300">
                {displayFormatDate(data?.created_at)}
              </span>
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
      )}

      {/*Tabs*/}

      <Tabs defaultValue="posts" className="grid gap-8">
        <TabsList className="bg-slate-800 ">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <ProfilePosts userId={data?.id} />
        </TabsContent>
        <TabsContent value="followers">
          <ProfileFollowers />
        </TabsContent>
      </Tabs>

      <CreatePost variant="secondary" />
    </div>
  );
};
