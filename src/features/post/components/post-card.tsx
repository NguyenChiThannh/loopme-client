import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import PostUpvote from "./post-upvote";
import { IPost } from "@/configs/type";
import HoverUsername from "@/features/post/components/hover-username";
import PostAction from "@/features/post/components/post-action";
import PostImage from "@/features/post/components/post-image";

interface PostCardProps {
    commentSectionRef?: React.RefObject<HTMLDivElement>;
    post: IPost;
}

export default function PostCard({ commentSectionRef, post }: PostCardProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const navigator = useNavigate();
    const isGroupDefined = post.group && Object.keys(post.group).length > 0;

    const scrollToComments = () => {
        if (commentSectionRef)
            commentSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
        else navigator(`/post/${post._id}`);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4 py-3">
                <Avatar className="size-12">
                    <AvatarImage
                        src={post.user?.avatar || ""}
                        alt={post.user?.displayName}
                    />
                    <AvatarFallback>{post.user.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        {isGroupDefined && (
                            <>
                                <Link
                                    to={`/group/${post.group?._id}`}
                                    className="h-auto p-0 text-sm font-semibold hover:underline"
                                >
                                    <span className="font-semibold">
                                        r/{post.group?.name}
                                    </span>
                                </Link>
                                <span className="text-sm text-muted-foreground">
                                    •
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Post by
                                </span>
                            </>
                        )}
                        <span className="text-sm text-muted-foreground">
                            <HoverUsername
                                _id={post.user._id}
                                displayName={post.user.displayName}
                                avatar={post.user.avatar || ""}
                            />
                        </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="py-3">
                <p className="mb-4 text-sm">{post.content}</p>
                {post.images &&
                    post.images.length > 0 &&
                    post.images.map((imageUrl, index) => (
                        <PostImage
                            key={index}
                            imageUrl={imageUrl}
                            isImageModalOpen={isImageModalOpen}
                            setIsImageModalOpen={setIsImageModalOpen}
                        />
                    ))}
                <CardFooter>
                    <PostUpvote post={post} />
                    <PostAction
                        post={post}
                        postCommentAction={scrollToComments}
                    />
                </CardFooter>
            </CardContent>
        </Card>
    );
}
