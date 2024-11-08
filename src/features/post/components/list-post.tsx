import PostCard from "./post-card";
import { IPost } from "@/configs/type";

interface ListPostProps {
    posts?: IPost[];
    isPending?: boolean;
}

export default function ListPost({ posts, isPending }: ListPostProps) {
    if (isPending) {
        return <p>Loading post...</p>;
    }
    if (!posts) {
        return <p>No post</p>;
    }
    return (
        <div className="flex flex-col space-y-4">
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
}
