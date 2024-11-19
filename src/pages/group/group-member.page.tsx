import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ROUTES } from "@/configs/route.config";
import { groupApi } from "@/features/group/apis";
import GroupMemberList from "@/features/group/components/group-member-list";
import GroupWaitingList from "@/features/group/components/group-waiting-list";
import { useUser } from "@/providers/user-provider";

export default function GroupMemberPage() {
    const { user } = useUser();
    const { groupId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
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
    const { data: members, isPending: isPendingMembers } =
        groupApi.query.useGetAllMembers(groupId);
    const { data: waitings, isPending: isPendingWaitings } =
        groupApi.query.useGetAllWaitings(
            groupId,
            searchParams.get("tab") === "waitings",
        );
    if (groupLoading || !groupData) {
        return <div>Loading...</div>;
    }
    const isMember = members?.data.data.some(
        (member) => member.user._id === user?._id,
    );
    if (!isMember) {
        navigate(ROUTES.HOME_PAGE);
        return;
    }
    const tabList = [
        {
            value: "members",
            label: "Members",
            content: (
                <GroupMemberList
                    member={members?.data.data}
                    isLoading={isPendingMembers}
                    owner={groupData.data.owner}
                    isAdmin={groupData.data.owner._id === user?._id}
                    groupId={groupId}
                />
            ),
        },
    ];
    if (groupData?.data.owner._id === user?._id) {
        tabList.push({
            value: "waitings",
            label: "Waitings",
            content: (
                <GroupWaitingList
                    member={waitings?.data.data}
                    isLoading={isPendingWaitings}
                    isAdmin={groupData?.data.owner._id === user?._id}
                    groupId={groupId}
                />
            ),
        });
    }

    return (
        <Tabs
            value={searchParams.get("tab") || "members"}
            defaultValue={tabList.at(0)?.value}
            className="space-y-4 md:col-span-2"
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
