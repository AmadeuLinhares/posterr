import { MOCK } from "@/mocks";
import { v7 } from "uuid";
export const injectMock = () => {
  const posts = localStorage.getItem("posts");
  const users = localStorage.getItem("users");
  const user = localStorage.getItem("user");
  const following = localStorage.getItem("following");

  if (!posts) {
    localStorage.setItem("posts", JSON.stringify(MOCK.posts));
  }
  if (!users) {
    localStorage.setItem("users", JSON.stringify(MOCK.users));
  }
  if (!following) {
    localStorage.setItem("following", JSON.stringify([]));
  }
  if (!user) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: v7(),
        userName: "Amadeu",
        created_at: "2020-02-18T00:00:00Z",
        followers: 0,
        following: 0,
        posts_count: 0,
        avatar: "https://i.pravatar.cc/?u=siajkhs987k",
      }),
    );
  }
};
