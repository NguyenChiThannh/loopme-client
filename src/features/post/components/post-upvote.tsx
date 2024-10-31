import { ArrowBigDown, ArrowBigUp, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

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

interface PostUpvote {
    upvote: () => void;
    downvote: () => void;
    post: Post;
}

export default function PostUpvote({ upvote, downvote, post }: PostUpvote) {
    const handleUpvote = () => {
        upvote();
    };
    const handleDownvote = () => {
        downvote();
    };
    return (
        <div className="flex items-center">
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleUpvote}
            >
                <ArrowBigUp className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-sm">{post.upvotes}</span>
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
