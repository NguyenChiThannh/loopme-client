import PostCard from "@/features/post/components/post-card";

type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    imageUrl?: string;
    upvotes: number;
    commentCount: number;
    postedAt: string;
};

export default function HomePage() {
    const posts: Post[] = [
        {
            id: 1,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 2,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 3,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 4,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
    ];
    return (
        <div className="flex flex-col space-y-4">
            {posts.map((post) => (
                <PostCard post={post} />
            ))}
        </div>
    );
}
