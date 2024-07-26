import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function PostsPage() {
  const { user } = useContext(AuthContext);

  return <h1>{user?.accessToken}</h1>;
}
