import { PlusCircleIcon } from "lucide-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PostCard from "@/features/post/components/post-card";
import { useUser } from "@/providers/user-provider";

type Params = {
    username: string;
};

type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    imageUrl?: string;
    upvotes: number;
    commentCount: number;
    postedAt: string;
};

export default function ProfilePage() {
    const params = useParams<Params>();
    const { isLoading, user, isSignedIn } = useUser();
    if (isLoading) {
        return <p>Loading Profile</p>;
    }
    if (!isSignedIn || !user) {
        return <p>Please login to enter this page</p>;
    }
    return (
        <section className="flex flex-col space-y-4">
            {/* Header */}
            <ProfileHeader username={user.displayName} />
            {/* Body */}
            <ProfileBody />
        </section>
    );
}

interface ProfileHeaderProps {
    username?: string;
}

export function ProfileHeader({ username }: ProfileHeaderProps) {
    return (
        <div className="flex items-center space-x-3">
            <img src="/user.png" className="size-16" />
            <div className="flex flex-col">
                <h2 className="text-3xl font-bold">{username}</h2>
                <h3 className="italic text-muted-foreground">{`u/${username}`}</h3>
            </div>
        </div>
    );
}

export function ProfileBody() {
    const posts: Post[] = [
        {
            id: 1,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 2,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 3,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
        {
            id: 4,
            title: "Interesting Post Title",
            content:
                "This is the main content of the post. It can be quite long and detailed, discussing various topics or sharing information.",
            author: "original_poster",
            imageUrl: "/placeholder.svg?height=600&width=800",
            upvotes: 256,
            commentCount: 45,
            postedAt: "5 hours ago",
        },
    ];
    const tabList = [
        {
            value: "overview",
            label: "Overview",
            content: (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard post={post} />
                    ))}
                </div>
            ),
        },
        {
            value: "post",
            label: "Post",
            content: <div>Post</div>,
        },
        {
            value: "comment",
            label: "Comment",
            content: <div>Commnet</div>,
        },
        {
            value: "upvote",
            label: "Upvote",
            content: <div>Upvote</div>,
        },
        {
            value: "downvote",
            label: "Downvote",
            content: <div>Downvote</div>,
        },
    ];
    return (
        <Tabs defaultValue={tabList.at(0)?.value} className="space-y-5">
            <TabsList className="w-[40%] justify-between bg-transparent">
                {tabList.map((tab, i) => (
                    <TabsTrigger
                        key={i}
                        value={tab.value}
                        className="rounded-full px-4 data-[state=active]:bg-slate-400"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <ProfileActions />
            <Separator />
            <div>
                {tabList.map(({ content, value }, i) => (
                    <TabsContent value={value} key={i}>
                        {content}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    );
}

export function ProfileActions() {
    return (
        <div>
            <Link to={"/create-post"}>
                <Button variant={"outline"}>
                    <PlusCircleIcon />
                    Create post
                </Button>
            </Link>
        </div>
    );
}
