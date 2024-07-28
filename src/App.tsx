import { Routes, Route, useNavigate } from "react-router-dom";
import WithAuth from "./components/WithAuth";

import PostsPage from "./PostsPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Header from "./Header";
import { useEffect } from "react";

const NewPostWithAuth = WithAuth(NewPost);
const PostPageWithAuth = WithAuth(PostPage);
const PostsPageWithAuth = WithAuth(PostsPage);

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/posts" element={<PostsPageWithAuth />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/new-post" element={<NewPostWithAuth />} />
        <Route path="/posts/:id" element={<PostPageWithAuth />} />
      </Routes>
    </>
  );
}

export default App;
