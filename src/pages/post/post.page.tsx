import {
    ChevronDown,
    ChevronUp,
    CornerDownRight,
    MessageSquare,
    Share2,
    X,
} from "lucide-react";
import { useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import HoverUsername from "@/features/post/components/hover-username";
import PostComment from "@/features/post/components/post-comment";
import PostReply from "@/features/post/components/post-reply";
import PostReplyForm from "@/features/post/components/post-reply-form";
import PostCommentForm from "@/features/post/components/post-comment-form";

type Comment = {
    id: number;
    author: string;
    content: string;
    upvotes: number;
    replies: Comment[];
};

type UserProfile = {
    username: string;
    karma: number;
    joinDate: string;
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

    const [newComment, setNewComment] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const commentSectionRef = useRef<HTMLDivElement>(null);

    const handleUpvote = () =>
        setPost((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
    const handleDownvote = () =>
        setPost((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }));

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: Date.now(),
                author: "current_user",
                content: newComment,
                upvotes: 0,
                replies: [],
            };
            setComments((prev) => [...prev, newCommentObj]);
            setNewComment("");
            setPost((prev) => ({
                ...prev,
                commentCount: prev.commentCount + 1,
            }));
        }
    };

    const handleUserClick = (username: string) => {
        setSelectedUser({
            username,
            karma: Math.floor(Math.random() * 10000),
            joinDate: new Date().toLocaleDateString(),
        });
    };

    const handleReplyClick = (commentId: number) => {
        setReplyingTo((prevState) =>
            prevState === commentId ? null : commentId,
        );
        setReplyContent("");
    };

    const handleReplySubmit = (parentId: number) => {
        if (replyContent.trim()) {
            const newReply: Comment = {
                id: Date.now(),
                author: "current_user",
                content: replyContent,
                upvotes: 0,
                replies: [],
            };
            setComments((prevComments) => {
                const updateReplies = (comments: Comment[]): Comment[] => {
                    return comments.map((comment) => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                replies: [...comment.replies, newReply],
                            };
                        } else if (comment.replies.length > 0) {
                            return {
                                ...comment,
                                replies: updateReplies(comment.replies),
                            };
                        }
                        return comment;
                    });
                };
                return updateReplies(prevComments);
            });
            setReplyingTo(null);
            setReplyContent("");
            setPost((prev) => ({
                ...prev,
                commentCount: prev.commentCount + 1,
            }));
        }
    };

    const renderComments = (
        comments: Comment[],
        isReply = false,
        depth = 0,
    ) => {
        return comments.map((comment) => (
            <div
                key={comment.id}
                className={`mb-2 ${isReply ? `ml-${depth * 4} border-l border-gray-200 pl-2` : ""}`}
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
                {replyingTo === comment.id && <PostReplyForm />}
                {comment.replies.length > 0 && (
                    <div>
                        {renderComments(comment.replies, true, depth + 1)}
                    </div>
                )}
            </div>
        ));
    };

    const scrollToComments = () => {
        commentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="mx-auto max-w-2xl p-4">
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-start gap-4 py-3">
                    <div className="flex flex-col items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleUpvote}
                        >
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-bold">
                            {post.upvotes}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleDownvote}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
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
                        <Dialog
                            open={isImageModalOpen}
                            onOpenChange={setIsImageModalOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="relative mb-4 w-full cursor-pointer overflow-hidden rounded-md">
                                    <img
                                        src={post.imageUrl}
                                        alt="Post image"
                                        className="h-auto w-full object-cover"
                                        style={{ maxHeight: "600px" }}
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-3xl p-0">
                                <div className="relative h-[80vh] w-full">
                                    <img
                                        src={post.imageUrl}
                                        alt="Enlarged post image"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between py-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={scrollToComments}
                    >
                        <MessageSquare className="mr-1 h-3 w-3" />
                        {post.commentCount} Comments
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <Share2 className="mr-1 h-3 w-3" />
                        Share
                    </Button>
                </CardFooter>
            </Card>

            <PostCommentForm />

            <div ref={commentSectionRef}>{renderComments(comments)}</div>
        </div>
    );
}
