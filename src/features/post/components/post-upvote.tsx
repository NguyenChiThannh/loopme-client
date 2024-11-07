import { ArrowBigDown, ArrowBigUp, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IPost } from "@/configs/type";

interface PostUpvote {
    upvote: () => void;
    downvote: () => void;
    post: IPost;
}

export default function PostUpvote({ upvote, downvote, post }: PostUpvote) {
    const handleUpvote = () => {
        upvote();
    };
    const handleDownvote = () => {
        downvote();
    };
    return (
        <div className="flex items-center rounded-2xl bg-slate-100 px-2 py-1">
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleUpvote}
            >
                <ArrowBigUp className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-sm">{post.totalVotes}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleDownvote}
            >
                <ArrowBigDown className="h-4 w-4" />
            </Button>
        </div>
    );
}
