import { Navigate, Route, Routes } from "react-router";
import { Feed } from "./pages/Feed";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/feed" replace />} />
      <Route path="feed" element={<Feed />} />
      {/*<Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route>*/}
    </Routes>
  );
}

export default App;
