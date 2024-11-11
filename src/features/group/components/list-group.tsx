import { GroupItem } from "./group-item";
import { Group } from "@/configs/type";

type GroupListProps = {
    groups?: Group[];
    isLoading?: boolean;
};

export function ListGroup({ groups = [], isLoading = false }: GroupListProps) {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="w-full space-y-8 px-10 py-2">
            <div className="space-y-4">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Groups</h2>
                    {groups.length === 0 ? (
                        <p className="text-muted-foreground">
                            You haven't joined any groups yet.
                        </p>
                    ) : (
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {groups.map((group) => (
                                <GroupItem group={group} key={group._id} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
