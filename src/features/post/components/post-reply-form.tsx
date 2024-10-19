import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostReplyForm() {
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
