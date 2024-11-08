import { PlusCircleIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "@/configs/type";
import { friendApi } from "@/features/friends/apis";
import { ListFriend } from "@/features/friends/components/list-friend";
import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";
import UserUpdateForm from "@/features/user/components/user-update-form";
import { UserUpdateDialog } from "@/features/user/layouts/user-update-dialog";
import { useUser } from "@/providers/user-provider";

export default function ProfilePage() {
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
            <ProfileHeader {...user} />
            {/* Body */}
            <ProfileBody />
        </section>
    );
}

interface ProfileHeaderProps extends User {}

export function ProfileHeader(props: ProfileHeaderProps) {
    return (
        <div className="flex items-center space-x-3">
            <img src="/user.png" className="size-16" />
            <div className="flex flex-col">
                <h2 className="text-3xl font-bold">{props.displayName}</h2>
                <h3 className="italic text-muted-foreground">{`u/${props.displayName}`}</h3>
            </div>
        </div>
    );
}

export function ProfileBody() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: posts, isPending: isPendingPosts } =
        postApi.query.useGetPost();
    const { data: friends, isPending: isLoadingFriends } =
        friendApi.query.useGetAllFriend(searchParams.get("tab") === "friend");
    const { data: pendingFriends, isPending: isPendingFriends } =
        friendApi.query.useGetPendingFriend(
            searchParams.get("tab") === "friend",
        );

    const tabList = [
        {
            value: "overview",
            label: "Overview",
            content: (
                <ListPost posts={posts?.data.data} isPending={isPendingPosts} />
            ),
        },
        {
            value: "friend",
            label: "Friend",
            content: (
                <ListFriend
                    friends={friends?.data.data}
                    pendingFriends={pendingFriends?.data.data}
                    isLoading={isPendingFriends || isLoadingFriends}
                />
            ),
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
        <Tabs
            value={searchParams.get("tab") || "overview"}
            defaultValue={tabList.at(0)?.value}
            className="space-y-5"
            onValueChange={(value) => {
                setSearchParams({ tab: value });
            }}
        >
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
    const { user, isLoading } = useUser();
    if (isLoading) {
        return <p>Loading</p>;
    }
    if (!user) return null;

    return (
        <div className="flex items-center space-x-3">
            <Link to={"/create-post"}>
                <Button variant={"outline"}>
                    <PlusCircleIcon />
                    Create post
                </Button>
            </Link>
            <UserUpdateDialog>
                <UserUpdateForm initialValues={user} />
            </UserUpdateDialog>
        </div>
    );
}
