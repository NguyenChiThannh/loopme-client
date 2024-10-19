import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
    handleCommentSubmit: (e: React.FormEvent) => void;
}

export default function PostCommentForm({
    handleCommentSubmit,
}: CommentFormProps) {
    const [newComment, setNewComment] = useState("");

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
