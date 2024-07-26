import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import PostsPage from "./PostsPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewPost from "./NewPost";

function App(): React.ReactNode {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="posts" element={<PostsPage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="new-post" element={<NewPost />} />
      </Routes>
    </>
  );
}

export default App;
