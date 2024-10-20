import { ChevronDown, ChevronUp } from "lucide-react";

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
        <div className="flex flex-col items-center">
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleUpvote}
            >
                <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-bold">{post.upvotes}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleDownvote}
            >
                <ChevronDown className="h-4 w-4" />
            </Button>
        </div>
    );
}
