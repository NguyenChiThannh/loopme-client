import PostCard from "./post-card";
import { IPost } from "@/configs/type";

interface ListPostProps {
    posts: IPost[];
}

export default function ListPost({ posts }: ListPostProps) {
    console.log("List:", posts);
    return (
        <div className="flex flex-col space-y-4">
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
}
