import Footer from "../components/front/footer";
import Navbar from "../components/front/navbar";
import PostList from "../components/front/postlist";
import Container from "../components/front/container";
// import { getPosts, getPublicContent } from "../lib/front/load-posts_build";
// import { getPosts, getPublicContent } from "../lib/front/get-data";
import { useEffect, useState } from "react";

const Main = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const result = await fetch('/api/front/front_page_posts');
      if (result.status === 200) {
        const posts = await result.json();
        setPosts(posts);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <Container>
        <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
          {posts && posts.slice(0, 2).map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
          {posts && posts.slice(2).map((post) => (
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

// export async function getStaticProps() {
//   const posts = await getPosts();
//   const publicContent = await getPublicContent();
//   console.log("STATIC PROPS 1")
//   // console.log(posts, publicContent)
//   return {
//     props: { posts, publicContent },
//   };
// }

export default Main;
