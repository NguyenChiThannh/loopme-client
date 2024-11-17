import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import HoverUsername from "./hover-username";
import { IComment } from "@/configs/type";
import { commentApi } from "@/features/comment/apis";

interface CommentProps {
    comment: IComment;
    currentUserId: string;
    postId: string;
}

export default function PostComment({
    comment,
    currentUserId,
    postId,
}: CommentProps) {
    const { mutate: removeComment } = commentApi.mutation.useRemoveComment();
    const handleRemoveClick = () => {
        removeComment({ commentId: comment._id });
    };
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 px-3 py-2">
                <Avatar className="size-8">
                    <AvatarImage
                        src={comment.user.avatar}
                        alt={comment.user.displayName}
                    />
                    <AvatarFallback>
                        {comment.user.displayName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <HoverUsername
                    _id={comment.user._id}
                    displayName={comment.user.displayName}
                    avatar={comment.user.avatar}
                />
            </CardHeader>
            <CardContent className="p-1 px-10">
                <p className="text-sm">{comment.content}</p>
            </CardContent>
            {currentUserId === comment.user._id && (
                <CardFooter className="flex items-center gap-2 px-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={handleRemoveClick}
                    >
                        Remove
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
