import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { cn } from "@/lib/utils";

import { ROUTES } from "@/configs/route.config";
import { IComment } from "@/configs/type";
import { postApi } from "@/features/post/apis";
import PostCard from "@/features/post/components/post-card";
import PostComment from "@/features/post/components/post-comment";
import PostCommentForm from "@/features/post/components/post-comment-form";
import PostReply from "@/features/post/components/post-reply";
import PostReplyForm from "@/features/post/components/post-reply-form";
import { useUser } from "@/providers/user-provider";

type Comment = {
    id: number;
    author: string;
    content: string;
    upvotes: number;
    replies: Comment[];
};

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

export default function PostPage() {
    const { postId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const commentSectionRef = useRef<HTMLDivElement>(null);
    if (!postId || !user?._id) {
        navigate(ROUTES.HOME_PAGE);
        return;
    }
    const { data, isLoading } = postApi.query.useGetPostById(postId);
    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    const renderComments = (comments: IComment[]) => {
        return comments.map((comment) => (
            <div key={comment._id} className={cn("mb-2")}>
                <PostComment
                    comment={comment}
                    currentUserId={user?._id}
                    postId={postId}
                />
            </div>
        ));
    };
    console.log(data.data[0]);
    return (
        <div className="max-w-2xl md:col-span-2">
            <PostCard
                commentSectionRef={commentSectionRef}
                post={data.data[0]}
            />
            <PostCommentForm postId={data.data[0]._id} />
            <div ref={commentSectionRef}>
                {renderComments(data.data[0].comments || [])}
            </div>
        </div>
    );
}
