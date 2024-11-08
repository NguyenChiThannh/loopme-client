import { Outlet, useNavigate, useParams } from "react-router";

import { groupApi } from "@/features/group/apis";
import { GroupInfoCard } from "@/features/group/components/group-info-card";
import { useUser } from "@/providers/user-provider";

export default function GroupLayout() {
    const { groupId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    if (!groupId) {
        navigate("/");
        return null;
    }
    console.log(groupId);
    const {
        data: groupData,
        isLoading: groupLoading,
        error: groupError,
    } = groupApi.query.useGetGroupById(groupId);

    if (!user || groupLoading || !groupData) {
        return <div>Loading...</div>;
    }

    if (groupError) {
        return <div>Error loading groups: {groupError.message}</div>;
    }

    return (
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3 lg:p-8">
            <Outlet />
            <GroupInfoCard
                createdAt={groupData.data.createdAt}
                name={groupData.data.name}
                members={groupData.data.members.length}
                groupId={groupData.data._id}
                isJoined={
                    groupData.data.members.some(
                        (member) => member.user._id === user._id,
                    ) || groupData.data.owner._id === user._id
                }
            />
        </div>
    );
}
