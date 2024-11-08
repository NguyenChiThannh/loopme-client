import { group } from "console";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { groupApi } from "@/features/group/apis";
import GroupUpdateButton from "@/features/group/components/group-update-button";
import { postApi } from "@/features/post/apis";
import { postRequestSchema } from "@/features/post/apis/type";
import ListPost from "@/features/post/components/list-post";
import PostCreateForm from "@/features/post/components/post-create-form";
import { CreatePostDialog } from "@/features/post/layouts/create-post-dialog";
import { useUser } from "@/providers/user-provider";
import { ROUTES } from "@/configs/route.config";

export default function GroupHomePage() {
    const { user } = useUser();
    const { groupId } = useParams();
    const navigate = useNavigate();
    if (!groupId) {
        navigate(ROUTES.HOME_PAGE);
        return;
    }
    const {
        data: groupData,
        isLoading: groupLoading,
        error: groupError,
    } = groupApi.query.useGetGroupById(groupId);
    const { data, error, isLoading } =
        postApi.query.useGetPostByGroupId(groupId);
    const { mutate: handleCreatePost } =
        postApi.mutation.useCreatePostInGroup();
    const createPost = (values: z.infer<typeof postRequestSchema.create>) => {
        handleCreatePost({ ...values, group: groupData?.data._id });
    };
    if (!data || isLoading || groupLoading || !groupData) {
        return <div>Loading...</div>;
    }

    if (groupError) {
        return <div>Error loading groups: {groupError.message}</div>;
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>; // Handle error state
    }
    return (
        <>
            <div className="fixed inset-x-0 inset-y-0 -z-50">
                <img src=""></img>
            </div>
            <div className="space-y-4 md:col-span-2">
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-2 pb-2 sm:flex-row sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <p className="font-medium hover:underline">
                                r/{groupData.data.name}
                            </p>
                        </CardTitle>
                        <CreatePostDialog>
                            <PostCreateForm onSubmit={createPost} />
                        </CreatePostDialog>
                        {groupData.data.owner._id === user?._id && (
                            <GroupUpdateButton />
                        )}
                    </CardHeader>
                </Card>

                <ListPost posts={data.data.data} />
            </div>
        </>
    );
}
