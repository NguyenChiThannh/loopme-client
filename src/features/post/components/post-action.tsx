import { MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

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

interface PostAction {
    post: Post;
    postCommentAction: () => void;
}

export default function PostAction({ post, postCommentAction }: PostAction) {
    return (
        <CardFooter className="flex justify-between py-2">
            <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={postCommentAction}
            >
                <MessageSquare className="mr-1 h-3 w-3" />
                {post.commentCount} Comments
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
                <Share2 className="mr-1 h-3 w-3" />
                Share
            </Button>
        </CardFooter>
    );
}
