import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import PostCard from "@/features/post/components/post-card";
import PostComment from "@/features/post/components/post-comment";
import PostCommentForm from "@/features/post/components/post-comment-form";
import PostReply from "@/features/post/components/post-reply";
import PostReplyForm from "@/features/post/components/post-reply-form";

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

    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "user123",
            content: "Great post! Really insightful.",
            upvotes: 15,
            replies: [
                {
                    id: 2,
                    author: "reply_user1",
                    content: "I agree, very informative!",
                    upvotes: 7,
                    replies: [],
                },
                {
                    id: 3,
                    author: "reply_user2",
                    content:
                        "Thanks for sharing your thoughts. I learned a lot from this.",
                    upvotes: 5,
                    replies: [
                        {
                            id: 4,
                            author: "nested_reply_user",
                            content:
                                "Glad to see others finding this helpful too!",
                            upvotes: 3,
                            replies: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 5,
            author: "another_user",
            content:
                "This is an interesting perspective. I have a different view though.",
            upvotes: 8,
            replies: [],
        },
    ]);

    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const commentSectionRef = useRef<HTMLDivElement>(null);

    const handleReplyClick = (commentId: number) => {
        setReplyingTo((prevState) =>
            prevState === commentId ? null : commentId,
        );
    };

    const renderComments = (
        comments: Comment[],
        isReply = false,
        depth = 0,
    ) => {
        return comments.map((comment) => (
            <div
                key={comment.id}
                className={cn("mb-2", {
                    [`ml-8 border-l border-gray-200 pl-2`]: isReply,
                })}
            >
                {isReply ? (
                    <PostReply
                        author={comment.author}
                        commentContent={comment.content}
                        commentId={comment.id}
                        handleReplyClick={handleReplyClick}
                        commentUpvote={comment.upvotes}
                    />
                ) : (
                    <PostComment
                        author={comment.author}
                        commentContent={comment.content}
                        commentId={comment.id}
                        handleReplyClick={handleReplyClick}
                        commentUpvote={comment.upvotes}
                    />
                )}
                {replyingTo === comment.id && (
                    <PostReplyForm
                        comment={comment}
                        setReplyingTo={setReplyingTo}
                    />
                )}
                {comment.replies.length > 0 && (
                    <div>
                        {renderComments(comment.replies, true, depth + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="mx-auto max-w-2xl p-4">
            <PostCard commentSectionRef={commentSectionRef} />
            <PostCommentForm />
            <div ref={commentSectionRef}>{renderComments(comments)}</div>
        </div>
    );
}
