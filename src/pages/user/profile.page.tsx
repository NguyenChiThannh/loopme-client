import { PlusCircleIcon } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "@/configs/type";
import { friendApi } from "@/features/friends/apis";
import { ListFriend } from "@/features/friends/components/list-friend";
import { groupApi } from "@/features/group/apis";
import { ListGroup } from "@/features/group/components/list-group";
import { postApi } from "@/features/post/apis";
import ListPost from "@/features/post/components/list-post";
import { userApi } from "@/features/user/apis";
import UserUpdateForm from "@/features/user/components/user-update-form";
import { UserUpdateDialog } from "@/features/user/layouts/user-update-dialog";
import { useUser } from "@/providers/user-provider";

type Params = {
    userId: string;
};

export default function ProfilePage() {
    const params = useParams<Params>();
    const { data, isPending, isError } = userApi.query.useGetUserById(
        params.userId || "",
    );
    if (isPending) {
        return <p>Loading Profile</p>;
    }
    if (!data || isError) {
        return <p>User not found !</p>;
    }
    return (
        <section className="flex flex-col space-y-4">
            {/* Header */}
            <ProfileHeader {...data.data} />
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
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: posts, isPending: isPendingPosts } =
        postApi.query.useGetPostByUserId(params.userId || "");
    const { data: friends, isPending: isLoadingFriends } =
        friendApi.query.useGetAllFriend(searchParams.get("tab") === "friend");
    const { data: pendingFriends, isPending: isPendingFriends } =
        friendApi.query.useGetPendingFriend(
            searchParams.get("tab") === "friend",
        );
    const { data: groups, isPending: isPendingGroups } =
        groupApi.query.useGetJoinedGroup(searchParams.get("tab") === "group");
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
        {
            value: "group",
            label: "Group",
            content: (
                <ListGroup groups={groups?.data} isLoading={isPendingGroups} />
            ),
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
