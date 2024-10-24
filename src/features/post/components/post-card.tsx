import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import HoverUsername from "@/features/post/components/hover-username";
import PostAction from "@/features/post/components/post-action";
import PostImage from "@/features/post/components/post-image";
import PostUpvote from "@/features/post/components/post-upvote";

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

interface PostCardProps {
    commentSectionRef: React.RefObject<HTMLDivElement>
}

export default function PostCard({commentSectionRef}: PostCardProps) {
    const [post, setPost] = useState<Post>({
        id: 1,
        title: "Interesting Post Title",
        content:
            "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
        author: "original_poster",
        imageUrl: "/placeholder.svg?height=600&width=800",
        upvotes: 256,
        commentCount: 45,
        postedAt: "5 hours ago",
    });

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleUpvote = () =>
        setPost((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
    const handleDownvote = () =>
        setPost((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }));


    const scrollToComments = () => {
        commentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-start gap-4 py-3">
                <PostUpvote
                    post={post}
                    downvote={handleDownvote}
                    upvote={handleUpvote}
                />
                <div className="flex-grow">
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    Posted by{" "}
                    <HoverUsername
                        name={post.author}
                        avatarSrc={""}
                        karma={0}
                        joinDate={""}
                        cakeDay={""}
                        description={""}
                    />{" "}
                    {post.postedAt}
                </div>
            </CardHeader>
            <CardContent className="py-3">
                <p className="mb-4 text-sm">{post.content}</p>
                {post.imageUrl && (
                    <PostImage
                        post={post}
                        isImageModalOpen={isImageModalOpen}
                        setIsImageModalOpen={setIsImageModalOpen}
                    />
                )}
            </CardContent>
            <PostAction post={post} postCommentAction={scrollToComments} />
        </Card>
    );
}
