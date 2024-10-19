import {
    ChevronDown,
    ChevronUp,
    CornerDownRight,
    MessageSquare,
    Share2,
    X,
} from "lucide-react";
import { useState } from "react";

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

export default function Component() {
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
    const [postVotes, setPostVotes] = useState(256);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");

    const handleUpvote = () => setPostVotes((prev) => prev + 1);
    const handleDownvote = () => setPostVotes((prev) => prev - 1);

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
                    <div className="bg-transparent">
                        <div className="flex items-center gap-2 py-2">
                            <Avatar className="h-5 w-5">
                                <AvatarFallback>
                                    {comment.author[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-sm font-semibold"
                                                    onClick={() =>
                                                        handleUserClick(
                                                            comment.author,
                                                        )
                                                    }
                                                >
                                                    {comment.author}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        User Profile
                                                    </DialogTitle>
                                                </DialogHeader>
                                                {selectedUser && (
                                                    <div className="mt-4">
                                                        <p>
                                                            <strong>
                                                                Username:
                                                            </strong>{" "}
                                                            {
                                                                selectedUser.username
                                                            }
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Karma:
                                                            </strong>{" "}
                                                            {selectedUser.karma}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Join Date:
                                                            </strong>{" "}
                                                            {
                                                                selectedUser.joinDate
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to view profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <CornerDownRight className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="py-1">
                            <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-2 py-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <ChevronUp className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">{comment.upvotes}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => handleReplyClick(comment.id)}
                            >
                                {replyingTo === comment.id
                                    ? "Cancel Reply"
                                    : "Reply"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 px-3 py-2">
                            <Avatar className="h-5 w-5">
                                <AvatarFallback>
                                    {comment.author[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-sm font-semibold"
                                                    onClick={() =>
                                                        handleUserClick(
                                                            comment.author,
                                                        )
                                                    }
                                                >
                                                    {comment.author}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        User Profile
                                                    </DialogTitle>
                                                </DialogHeader>
                                                {selectedUser && (
                                                    <div className="mt-4">
                                                        <p>
                                                            <strong>
                                                                Username:
                                                            </strong>{" "}
                                                            {
                                                                selectedUser.username
                                                            }
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Karma:
                                                            </strong>{" "}
                                                            {selectedUser.karma}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Join Date:
                                                            </strong>{" "}
                                                            {
                                                                selectedUser.joinDate
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to view profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardHeader>
                        <CardContent className="px-3 py-2">
                            <p className="text-sm">{comment.content}</p>
                        </CardContent>
                        <CardFooter className="flex items-center gap-2 px-3 py-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <ChevronUp className="h-4 w-4" />
                            </Button>
                            <span className="text-xs">{comment.upvotes}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => handleReplyClick(comment.id)}
                            >
                                {replyingTo === comment.id
                                    ? "Cancel Reply"
                                    : "Reply"}
                            </Button>
                        </CardFooter>
                    </Card>
                )}
                {replyingTo === comment.id && (
                    <div className="ml-4 mt-2">
                        <Textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="mb-2 text-sm"
                            rows={3}
                        />
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={() => handleReplySubmit(comment.id)}
                            >
                                Submit Reply
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setReplyingTo(null)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
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
                        <span className="text-sm font-bold">{postVotes}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleDownvote}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">
                            Interesting Post Title
                        </h1>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-xs text-muted-foreground"
                                                onClick={() =>
                                                    handleUserClick(
                                                        "original_poster",
                                                    )
                                                }
                                            >
                                                Posted by u/original_poster 5
                                                hours ago
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    User Profile
                                                </DialogTitle>
                                            </DialogHeader>
                                            {selectedUser && (
                                                <div className="mt-4">
                                                    <p>
                                                        <strong>
                                                            Username:
                                                        </strong>{" "}
                                                        {selectedUser.username}
                                                    </p>
                                                    <p>
                                                        <strong>Karma:</strong>{" "}
                                                        {selectedUser.karma}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Join Date:
                                                        </strong>{" "}
                                                        {selectedUser.joinDate}
                                                    </p>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to view profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
                <CardContent className="py-3">
                    <p className="text-sm">
                        This is the main content of the post. It can be quite
                        long and detailed, discussing various topics or sharing
                        information.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between py-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        {comments.length} Comments
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <Share2 className="mr-1 h-3 w-3" />
                        Share
                    </Button>
                </CardFooter>
            </Card>

            <form onSubmit={handleCommentSubmit} className="mb-6">
                <Textarea
                    placeholder="What are your thoughts?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2 text-sm"
                    rows={3}
                />
                <Button type="submit" size="sm">
                    Comment
                </Button>
            </form>

            <div>{renderComments(comments)}</div>
        </div>
    );
}
