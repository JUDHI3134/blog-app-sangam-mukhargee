import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Blog",
  description: "Next.js Blog"
}

export default async function Home() {

  const posts = await getAllPosts();


  return (
    <main className="py-10">
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Welcome to the Blog</h1>

          {
            posts.length === 0 ? 
              <div className="text-center py-10">
                  <h1 className="text-xl font-semibold">No Blogs Found</h1>
              </div> :
             <PostList posts={posts} />
          }

      </div>
    </main>
  );
}
