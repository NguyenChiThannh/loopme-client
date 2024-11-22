import { postApi } from "../apis";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { commentApi } from "@/features/comment/apis";

interface CommentProps {
    postId: string;
}

export default function PostCommentForm({ postId }: CommentProps) {
    const { mutate: addComment } = commentApi.mutation.useAddComment();
    const [newComment, setNewComment] = useState("");
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment || newComment.trim().length === 0) return;
        addComment({ postId, content: newComment });
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
