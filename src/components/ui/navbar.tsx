import { useFetchProfile } from "@/queries/useFetchProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { memo, useCallback, useMemo } from "react";
import { Skeleton } from "./skeleton";
import { useLocation, useNavigate } from "react-router";

const Nav = () => {
  const { data, isLoading } = useFetchProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfile = useCallback(() => {
    // push so that "Back" closes modal and returns to /feed
    navigate("/profile", { state: { backgroundLocation: location } });
  }, [navigate, location]);

  const loading = useMemo(() => {
    if (!isLoading) return null;
    return (
      <div className="flex justify-between items-center space-x-4">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }, [isLoading]);

  return (
    <div className="px-6 py-4 w-full bg-primary rounded-b-2xl sticky top-0 z-10">
      {loading}

      {!isLoading && (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-secondary text-xl font-bold">P O S T E R R</h3>
          </div>
          <div>
            <Avatar onClick={handleProfile} className="w-[40px] h-[40px]">
              <AvatarImage loading={"eager"} src={data?.avatar} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </div>
  );
};

export const Navbar = memo(Nav);
