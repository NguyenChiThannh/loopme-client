import { useNavigate, useParams } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import GroupUpdateButton from "@/features/group/components/group-update-button";
import { GroupHoverInfo } from "@/features/group/components/hover-groupname";
import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";

export default function GroupHomePage() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    if (!groupId) {
        navigate("/");
        return null;
    }
    const { data, error, isLoading } =
        postApi.query.useGetPostByGroupId(groupId);
    
        console.log(data);
    if (!data || isLoading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error loading posts: {error.message}</div>; // Handle error state
    }

    return (
        <>
            <div className="fixed inset-x-0 inset-y-0 -z-50">
                <img></img>
            </div>
            <div className="space-y-4 md:col-span-2">
                <Card>
                    <CardHeader className="flex flex-col items-start justify-between space-y-2 pb-2 sm:flex-row sm:items-center sm:space-y-0">
                        <CardTitle className="text-2xl font-bold">
                            <GroupHoverInfo
                                name="ProgrammingHumor"
                                avatarSrc="/placeholder.svg?height=40&width=40"
                                members={1234567}
                                online={4321}
                                description="A subreddit for programmers to share humorous content related to programming and technology."
                            />
                        </CardTitle>
                        <GroupUpdateButton />
                    </CardHeader>
                    <CardContent>
                        <p>
                            Welcome to r/ProgrammingHumor, where programmers
                            come to laugh!
                        </p>
                    </CardContent>
                </Card>

                <ListPost posts={data.data.data} />
            </div>
        </>
    );
}
