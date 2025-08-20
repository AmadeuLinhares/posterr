import { useMemo } from "react";
import { useLocation } from "react-router";
import { Feed } from "../Feed";
import { Profile } from "../Profile";

export const Home = () => {
  const location = useLocation();
  console.log(location.pathname); // "/feed"

  const content = useMemo(() => {
    switch (location.pathname) {
      case "/feed":
        return <Feed />;
      case "/profile":
        return <Profile />;
      default:
        return null;
    }
  }, [location.pathname]);

  return <div>{content}</div>;
};
