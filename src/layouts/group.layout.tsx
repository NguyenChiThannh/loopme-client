import { Outlet } from "react-router";

import { GroupInfoCard } from "@/features/group/components/group-info-card";

export default function GroupLayout() {
    return (
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-3 lg:p-8">
            <Outlet />
            <GroupInfoCard />
        </div>
    );
}
