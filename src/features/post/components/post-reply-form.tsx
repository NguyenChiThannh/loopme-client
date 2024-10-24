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

interface PostReplyform {
    comment: Comment;
    setReplyingTo: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function PostReplyForm({
    comment,
    setReplyingTo,
}: PostReplyform) {
    const [replyContent, setReplyContent] = useState("");

    const handleReplySubmit = (parentId: number) => {
        console.log(parentId);
        if (replyContent.trim()) {
            setReplyingTo(null);
            setReplyContent("");
        }
    };

    return (
        <div className="ml-4 mt-2">
            <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="mb-2 text-sm"
                rows={3}
            />
            <div className="flex gap-2">
                <Button size="sm" onClick={() => handleReplySubmit(comment.id)}>
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
    );
}
