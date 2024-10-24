import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Comment = {
    id: number;
    author: string;
    content: string;
    upvotes: number;
    replies: Comment[];
};

export default function PostCommentForm() {
    const [newComment, setNewComment] = useState("");

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
            setNewComment("");
            console.log(newCommentObj);
        }
    };

    return (
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
    );
}
