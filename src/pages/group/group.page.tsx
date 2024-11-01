import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GroupInfoCard } from "@/features/group/components/group-info-card";
import GroupUpdateButton from "@/features/group/components/group-update-button";
import { GroupHoverInfo } from "@/features/group/components/hover-groupname";
import PostCard from "@/features/post/components/post-card";

const posts = [
    {
        id: 1,
        title: "When you finally fix that bug you've been working on for hours",
        content: "asd",
        author: "debuggingmaster",
        postedAt: "2 hours ago",
        upvotes: 1234,
        commentCount: 89,
        imageUrl: "123",
    },
    {
        id: 1,
        title: "When you finally fix that bug you've been working on for hours",
        content: "asd",
        author: "debuggingmaster",
        postedAt: "2 hours ago",
        upvotes: 1234,
        commentCount: 89,
        imageUrl: "123",
    },
    {
        id: 1,
        title: "When you finally fix that bug you've been working on for hours",
        content: "asd",
        author: "debuggingmaster",
        postedAt: "2 hours ago",
        upvotes: 1234,
        commentCount: 89,
        imageUrl: "123",
    },
];

export default function GroupHomePage() {
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

                {posts.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </>
    );
}
