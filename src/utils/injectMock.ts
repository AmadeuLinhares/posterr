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
        avatar:
          "https://images.unsplash.com/photo-1631624217902-d14c634ab17c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }),
    );
  }
};
