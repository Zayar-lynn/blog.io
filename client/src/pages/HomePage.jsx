import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post._id} />
      ))}
    </>
  );
};

export default HomePage;
