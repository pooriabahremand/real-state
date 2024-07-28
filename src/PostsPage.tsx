import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { get } from "./api/HttpHelper";
import { PostInterface } from "./interface/interface";
import { Link } from "react-router-dom";

export default function PostsPage() {
  const [posts, setPosts] = useState<PostInterface[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await get("posts");
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "24px",
        margin: "12px",
        padding: "12px",
        backgroundColor: "default",
      }}
    >
      {posts?.map((post, index) => (
        <Card key={index}>
          <CardContent
            sx={{
              display: "grid",
              gridTemplateRows: "2fr 2fr 1fr",
              height: "100%",
            }}
          >
            <Box>
              <Typography variant="h6" component="div">
                آدرس
              </Typography>
              <Typography variant="body2">{post.address}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="div">
                توضیحات
              </Typography>
              <Typography variant="body2">{post.description}</Typography>
            </Box>
            <Button size="small" sx={{ placeSelf: "center" }}>
              <Link to={`/posts/${post.id}`}>اطلاعات بیشتر</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
