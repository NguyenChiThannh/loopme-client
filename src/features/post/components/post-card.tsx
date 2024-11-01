import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import PostUpvote from "./post-upvote";
import HoverUsername from "@/features/post/components/hover-username";
import PostAction from "@/features/post/components/post-action";
import PostImage from "@/features/post/components/post-image";

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
    commentSectionRef?: React.RefObject<HTMLDivElement>;
    post: Post;
}

export default function PostCard({ commentSectionRef, post }: PostCardProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // const handleUpvote = () =>
    //     setPost((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
    // const handleDownvote = () =>
    //     setPost((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }));

    const scrollToComments = () => {
        commentSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4 py-3">
                {/* <PostUpvote
                    post={post}
                    downvote={handleDownvote}
                    upvote={handleUpvote}
                /> */}
                <Avatar className="size-12">
                    <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="u/RedditUser123"
                    />
                    <AvatarFallback>RU</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">r/AskReddit</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                            Post by
                        </span>
                        <span className="text-sm text-muted-foreground">
                            <HoverUsername
                                name={post.author}
                                avatarSrc={""}
                                karma={0}
                                joinDate={""}
                                cakeDay={""}
                                description={""}
                            />
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {post.postedAt}
                    </span>
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
                <CardFooter>
                    <PostUpvote
                        post={post}
                        downvote={() => {}}
                        upvote={() => {}}
                    />
                    <PostAction
                        post={post}
                        postCommentAction={scrollToComments}
                    />
                </CardFooter>
            </CardContent>
        </Card>
    );
}
