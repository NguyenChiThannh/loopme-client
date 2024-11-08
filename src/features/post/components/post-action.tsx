import { MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { IPost } from "@/configs/type";

interface PostAction {
    post: IPost;
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
                {post.comments?.length ?? ""} Comments
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
                <Share2 className="mr-1 h-3 w-3" />
                Share
            </Button>
        </CardFooter>
    );
}
