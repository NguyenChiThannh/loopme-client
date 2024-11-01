import { ChevronDown, ChevronUp } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

import HoverUsername from "./hover-username";

interface CommentProps {
    author: string;
    commentContent: string;
    commentUpvote: number;
    commentId: number;
    handleReplyClick: (id: number) => void;
}

export default function PostComment({
    author,
    commentContent,
    commentUpvote,
    commentId,
    handleReplyClick,
}: CommentProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 px-3 py-2">
                <Avatar className="h-5 w-5">
                    <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <HoverUsername
                    avatarSrc=""
                    description="12345"
                    cakeDay="12/12/12"
                    name="Good job"
                    joinDate="12/12/12"
                    karma={1}
                />
            </CardHeader>
            <CardContent className="px-3 py-2">
                <p className="text-sm">{commentContent}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-2 px-3 py-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronUp className="h-4 w-4" />
                </Button>
                <span className="text-xs">{commentUpvote}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => handleReplyClick(commentId)}
                >
                    Reply
                </Button>
            </CardFooter>
        </Card>
    );
}
