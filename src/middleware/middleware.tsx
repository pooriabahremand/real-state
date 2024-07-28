import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { get } from "../api/HttpHelper";

type WithAuthProps = {
  // Define any props your HOC might need here
};

export const withAuthMiddleware = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & WithAuthProps) => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const currentPath = window.location.pathname; // Get current path

    const getPost = useCallback(async () => {
      if (currentPath.startsWith("/posts/")) {
        const postId = currentPath.split("/")[2]; // Extract postId from path

        try {
          const post = await get(`posts/${postId}`);
          // console.log(post);
          // console.log(user);
          if (post.userId === user?.userId) {
            setUser({
              ...(user as {
                accessToken: string;
                userId: number;
                role: "user" | "owner";
              }),
              role: "owner",
            });
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          // Handle error, e.g., redirect to error page or display error message
        }
      }
    }, [currentPath, user, setUser]);

    useEffect(() => {
      if (!user?.role) {
        navigate("/login"); // Redirect if unauthorized
      } else {
        getPost(); // Fetch post details if user is authorized
      }
    }, [user, getPost, navigate]);

    return <Component {...props} />;
  };
};
