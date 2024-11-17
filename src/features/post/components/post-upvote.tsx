import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { IPost } from "@/configs/type";
import { voteApi } from "@/features/vote/apis";

interface PostUpvote {
    post: IPost;
}

export default function PostUpvote({ post }: PostUpvote) {
    const { mutate: upvote } = voteApi.mutation.useUpvote();
    const { mutate: downvote } = voteApi.mutation.useDownvote();
    const { mutate: removevote } = voteApi.mutation.useRemovevote();
    const [voteState, setVoteState] = useState<string | null>(post.voteValue);
    const [totalVote, setTotalVote] = useState<number>(post.totalVotes);
    const handleUpvote = () => {
        if (voteState === "UPVOTE") {
            removevote(post._id, {
                onSuccess: () => {
                    setTotalVote((totalVote) => totalVote - 1);
                    console.log("here");
                    setVoteState(null);
                },
            });
        } else {
            upvote(post._id, {
                onSuccess: () => {
                    setTotalVote((totalVote) =>
                        voteState === "DOWNVOTE"
                            ? totalVote + 2
                            : totalVote + 1,
                    );
                    setVoteState("UPVOTE");
                },
            });
        }
    };
    const handleDownvote = () => {
        if (voteState === "DOWNVOTE") {
            removevote(post._id, {
                onSuccess: () => {
                    setTotalVote((totalVote) => totalVote + 1);
                    setVoteState(null);
                },
            });
        } else {
            downvote(post._id, {
                onSuccess: () => {
                    setTotalVote((totalVote) =>
                        voteState === "UPVOTE" ? totalVote - 2 : totalVote - 1,
                    );
                    setVoteState("DOWNVOTE");
                },
            });
        }
    };
    return (
        <div className="flex items-center rounded-2xl bg-slate-100 px-2 py-1">
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleUpvote}
            >
                <ArrowBigUp
                    className={cn(
                        "h-4 w-4",
                        voteState === "UPVOTE" && "fill-black",
                    )}
                />
            </Button>
            <span className="mx-2 text-sm">{totalVote}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleDownvote}
            >
                <ArrowBigDown
                    className={cn(
                        "h-4 w-4",
                        voteState === "DOWNVOTE" && "fill-black",
                    )}
                />
            </Button>
        </div>
    );
}
