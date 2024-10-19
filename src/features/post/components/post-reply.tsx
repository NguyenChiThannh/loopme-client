import { ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import HoverGroupname from "./hover-groupname";
import HoverUsername from "./hover-username";

interface CommentProps {
    author: string;
    commentContent: string;
    commentUpvote: number;
    commentId: number;
    handleReplyClick: (id: number) => void;
}

export default function PostReply({
    author,
    commentContent,
    commentUpvote,
    commentId,
    handleReplyClick,
}: CommentProps) {
    return (
        <div className="bg-transparent">
            <div className="flex items-center gap-2 py-2">
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
                <CornerDownRight className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="py-1">
                <p className="text-sm">{commentContent}</p>
            </div>
            <div className="flex items-center gap-2 py-1">
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
            </div>
        </div>
    );
}
