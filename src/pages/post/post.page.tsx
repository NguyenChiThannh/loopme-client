import { useRef } from "react";
import { useNavigate, useParams } from "react-router";

import { cn } from "@/lib/utils";

import { ROUTES } from "@/configs/route.config";
import { IComment } from "@/configs/type";
import { postApi } from "@/features/post/apis";
import PostCard from "@/features/post/components/post-card";
import PostComment from "@/features/post/components/post-comment";
import PostCommentForm from "@/features/post/components/post-comment-form";
import { useUser } from "@/providers/user-provider";

export default function PostPage() {
    const { postId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const commentSectionRef = useRef<HTMLDivElement>(null);
    if (!postId || !user?._id) {
        navigate(ROUTES.HOME_PAGE);
        return;
    }
    const { data, isLoading } = postApi.query.useGetPostById(postId);
    if (!data || isLoading) {
        return <div>Loading...</div>;
    }

    const renderComments = (comments: IComment[]) => {
        return comments.map((comment) => (
            <div key={comment._id} className={cn("mb-2")}>
                <PostComment
                    comment={comment}
                    currentUserId={user?._id}
                    postId={postId}
                />
            </div>
        ));
    };
    console.log(data);
    console.log(data.data);
    return (
        <div className="max-w-2xl md:col-span-2">
            <PostCard
                commentSectionRef={commentSectionRef}
                post={data.data}
            />
            <PostCommentForm postId={data.data._id} />
            <div ref={commentSectionRef}>
                {renderComments(data.data.comments || [])}
            </div>
        </div>
    );
}
