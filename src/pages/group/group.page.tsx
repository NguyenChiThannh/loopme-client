import { ArrowBigDown, ArrowBigUp, MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
    {
        title: "When you finally fix that bug you've been working on for hours",
        author: "debuggingmaster",
        timeAgo: "2 hours ago",
        votes: 1234,
        comments: 89,
    },
    {
        title: "CSS expectations vs reality",
        author: "frontendninja",
        timeAgo: "5 hours ago",
        votes: 987,
        comments: 56,
    },
    {
        title: "My code in production be like",
        author: "memedev42",
        timeAgo: "8 hours ago",
        votes: 765,
        comments: 34,
    },
];

export default function GroupHomePage() {
    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3 lg:p-8">
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
                        <Button>Join</Button>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Welcome to r/ProgrammingHumor, where programmers
                            come to laugh!
                        </p>
                    </CardContent>
                </Card>

                {posts.map((post, index) => (
                    <Card key={index}>
                        <CardContent className="flex items-start space-x-4 pt-6">
                            <div className="flex flex-col items-center space-y-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <ArrowBigUp className="h-6 w-6" />
                                </Button>
                                <span className="font-bold">{post.votes}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <ArrowBigDown className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-lg font-semibold">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Posted by{" "}
                                    <UserHoverInfo
                                        name={post.author}
                                        avatarSrc="/placeholder.svg?height=40&width=40"
                                        karma={12345}
                                        joinDate="Sep 2021"
                                        cakeDay="Sep 15"
                                        description="Passionate programmer and meme enthusiast."
                                    />{" "}
                                    {post.timeAgo}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span>{post.comments} Comments</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <Share2 className="h-4 w-4" />
                                        <span>Share</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            About Community
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            A subreddit for programmers to share humorous
                            content related to programming and technology.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Members:</span>
                                <span className="font-bold">1,234,567</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Online:</span>
                                <span className="font-bold">4,321</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            r/ProgrammingHumor Rules
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-inside list-decimal space-y-3 text-sm">
                            <li className="text-pretty pl-1">
                                Posts must be humorous and related to
                                programming
                            </li>
                            <li className="text-pretty pl-1">
                                No reposts within 6 months
                            </li>
                            <li className="text-pretty pl-1">
                                No low-effort or low-quality posts
                            </li>
                            <li className="text-pretty pl-1">
                                Be respectful and follow Reddit's content policy
                            </li>
                            <li className="text-pretty pl-1">
                                Mark NSFW content appropriately
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
